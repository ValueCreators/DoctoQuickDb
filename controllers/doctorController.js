//This Controller deals with all functionalities of User

function doctorController () {

	var async = require('async');
	var config = require('../config');
	var cloudinary = require('cloudinary');
	var DoctorTable = require('../models/doctorSchema');

	// Creating New User
	this.registerDoctor = function (req, res, next) {
	
		console.log('request params',req);
		console.log('image url--->',req.files.profileImage.path);
		var profilePic = req.profileImage ? req.profileImage : req.files.profileImage.path;

		/*
		* 1. check if Phone Number already exist in the db.
		*    if yes, don't add and return registered mobile number
		* 2. if no, create a new doctor profile in the db.
		* 3. return the success callback
		*/

		async.waterfall([

			checkIfDoctorFound.bind(undefined, req.params.mobile),

			uploadImage.bind(undefined, profilePic),

			createDoctor.bind(undefined, req.params),

			//saveUser.bind(undefined)

		], function final (err, data) {
			console.log('finally it is coming to the final function',data, err);

			if (err) {
				return res.send({'error':err});
			} else {
				return res.send({'result':data,'status':'successfully saved'});
			}
		});

	};

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
				return callback(obj);
				
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


	//upload Image

	function uploadImage(image, obj, callback) {
		console.log('upload image--->',obj, image);
		if (!obj.is_found) {
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
			return callback(obj);
		}
	};


return this;

};

module.exports = new doctorController();