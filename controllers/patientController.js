//This Controller deals with all functionalities of User

function patientController () {

	var async = require('async');
	var config = require('../config');
	var common = require('../utils/common');
	var request = require('request');
	var cloudinary = require('cloudinary');
	var PatientTable = require('../models/patientSchema');

	// Creating New User
	this.registerPatient = function (req, res, next) {
	
		console.log('request params patient',req.params);
		//var profilePic = req.files.profileImage.path;

		async.waterfall([

			checkIfPatientFound.bind(undefined, req.params.mobile),

			//uploadImage.bind(undefined, profilePic),

			createPatient.bind(undefined, req.params),

			//saveUser.bind(undefined)

		], function final (err, data) {
			console.log('finally it is coming to the final function after create doctor',data, err);

			if (err) {
				return res.send({'error':err});
			} else {
				return res.send({'result':data,'status':'successfully saved'});
			}
		});
	};

	this.loginPatient = function (req, res next) {
		PatientTable.findOne({
			mobile: req.params.mobile,
			password: req.params.password
		}, function (err, data) {
				console.log('lafter login ------>',err,data);
				if (err || data === null) {
					return res.send({'result':err,'status':'Login fails!!!!'});
				}
				return res.send({'result':data,'status':'successfully loggedIn'});
		});
	};

	//checking doctor already registered or not
	function checkIfPatientFound (mobile_number, callback) {
		
		PatientTable.find({
				mobile: mobile_number //checking in the database if mobile number is present r not
			}, function (err, data) {
				if (err) {
					return callback(err);
				}

				//  JSON Object contains authkey if user exists
      			var obj = {};
      
      			if (data.length === 0) {
      				console.log('is found false');
					obj.is_found = false;
					return callback(null, obj);
				}

				console.log('response data true',data);
				obj.is_found = true;
				obj.phone_number = data[0].mobile;
				obj.message = 'Already registered';
				return callback(null, obj);
				
		})
	};

	//create doctor in the doctor table
	function createPatient (req, obj, callback) {

		console.log('create doctor', req, obj);
		if (!obj.is_found) {
			//req.profileImage = obj.image;
			PatientTable.create(req, function(err, result) {

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
			return callback(null, obj);
		}

	};


	
	return this;
};
module.exports = new patientController();