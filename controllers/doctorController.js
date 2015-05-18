//This Controller deals with all functionalities of User

function doctorController () {

	var async = require('async');
	var config = require('../config');
	var common = require('../utils/common');
	var request = require('request');
	var cloudinary = require('cloudinary');
	var DoctorTable = require('../models/doctorSchema');

	// Creating New User
	this.registerDoctor = function (req, res, next) {
	
		/*
		* 1. check if Phone Number already exist in the db.
		*    if yes, don't add and return registered mobile number
		* 2. if no, create a new doctor profile in the db.
		* 3. return the success callback
		*/

		async.waterfall([

			checkIfDoctorFound.bind(undefined, req.params.mobile),

			createDoctor.bind(undefined, req.params),

			//saveUser.bind(undefined)

		], function final (err, data) {
			console.log('finally it is coming to the final function after create doctor',data, err);

			if (err) {
				return res.send({'error':err});
			} else {
				return res.send({'result':data,'status':'successfully saved'});
			}
		});

	}

	this.registerDoctorFromAgent = function (req, res, next) {
		//console.log('request params ----->',req.headers);
		var profilePic = req.files.profileImage.path; //req.profileImage ? req.profileImage : 


		console.log('image url--->',profilePic);

		async.waterfall([

			checkIfDoctorFound.bind(undefined, req.params.mobile),

			uploadImage.bind(undefined, profilePic),

			updateDoctor.bind(undefined, req.params)


		], function final (err, data) {
			console.log('finally it is coming to the final after agetnt registration',data, err);
			if (err) {
				return res.send({'error':err});
			} else {

				var country_code = 91; //only for india
				//Integration of Nexmo SMS Gateway to send Verification Code to Mobile
				var to = 918904814609;
				var from = "DoctoQuick";
				var message = "Your User Id is:" + data.userId +" and password for your DoctoQuick is:"+data.password;
				var url = "http://rest.nexmo.com/sms/json?api_key="+config.nexmo_api_key+"&api_secret="+config.nexmo_api_secret+"&from="+from+"&to="+to+"&text="+message;
       			
				
				async.waterfall([
					sendMessage.bind(undefined, url),
					verifyDelivery.bind(undefined)
				],function final(err, data) {
					console.log('after sending the message--->',err , data);
					return res.send({'result':data,'status':'successfully saved'});
				});

				function sendMessage (url, callback) {
					request(url, function(err, response, data) {
						if (!err) {
							return callback(null, JSON.parse(data));
						} else {
							return callback(err);
						}
					}).setMaxListeners(12);
				}

				function verifyDelivery (result, callback) {
					var arr = [];
					var messageId;
					var newurl;
					var obj = {"DND":"false"};
					Object.keys(result.messages[0]).forEach(function(key) {
						arr.push(result.messages[0][key]);
					});
					messageId = arr[1];
					newurl = "http://rest.nexmo.com/search/message/"+config.nexmo_api_key+"/"+config.nexmo_api_secret+"/"+messageId;
					setTimeout(function(){
						request(newurl, function(err, response, data) {
							if (!err) {
								var val = JSON.parse(data);
								Object.keys(val).forEach(function(key) {
									if (key === "final-status") {
										if (val[key] === "UNDELIV") {
											obj.DND = true;
										} else {
											obj.DND = false;
										}
									} 

								});

								return callback(null, obj);
							}  

						}).setMaxListeners(12);
					},16000); //15000

				}
			}
		});

	}

	//checking doctor already registered or not
	function checkIfDoctorFound (mobile_number, callback) {
		
		DoctorTable.find({
				mobile: mobile_number //checking in the database if mobile number is present r not
			}, function (err, data) {
				if (err) {
					return callback(err);
				}

				//  JSON Object contains authkey if user exists
      			var obj = {};
      
      			if (data.length === 0) {
					obj.is_found = false;
					return callback(null, obj);
				}

				console.log('response data',data);
				obj.is_found = true;
				obj.phone_number = data[0].mobile;
				obj.message = 'Already registered';
				return callback(null, obj);
				
		})
	};

	//create doctor in the doctor table
	function createDoctor (req, obj, callback) {

		console.log('create doctor', req, obj);
		if (!obj.is_found) {
			req.profileImage = obj.image;
			DoctorTable.create(req, function(err, result) {

				console.log('response data',result);
				if (err) {
					console.log(err);
					return callback(err);
				}
				else {
					return callback(null, result);
				}
			});
		} else {
			return callback(obj);
		}

	};

	//update doctor in the doctor table
	function updateDoctor (req, obj, callback) {
		console.log('update doctor');
		if (obj.is_found) {
			req.profileImage = obj.image;
			DoctorTable.update({mobile: req.mobile}, {$set: req}, function(err, result) {
				if( err) { 
					console.log("User not updated");
					console.log(err);
					return callback(err);
				}
				else { 
					console.log("User updated ---->",result);
					return callback(null, result);
				}
			});
		} else {
			createDoctor (req, obj, callback);
		}
	};


	//upload Image

	function uploadImage(image, obj, callback) {
		console.log('upload image--->',image);
		//var obj = {};
		if (image) {
			//set the cloudinary configuration
			cloudinary.config({ 
				cloud_name: config.cloudinary_cloud_name, 
				api_key: config.cloudinary_api_key, 
				api_secret: config.cloudinary_api_secret 
			});

			if (image === "") {
				obj.image = "";
				return callback(null, obj);
			} else {
					cloudinary.uploader.upload(image, function(result) {

					console.log('result image url--->',result);
					obj.image = cloudinary.url(result.public_id + ".jpg");
					return callback(null, obj);

				});
			}
		} else {
			//if image is not present sending empty as in successcallback
			obj.image = "";
			return callback(null, obj);
		}
	};


return this;

};

module.exports = new doctorController();