//This Controller deals with all functionalities of User

function patientController () {

	var PatientTable = require('../models/patientSchema');

	// Creating New User
	this.registerPatient = function (req, res, next) {
	
		console.log('request params',req.params);

		PatientTable.create(req, function(err, result) {

			console.log('response data',result);
			if (err) {
				console.log(err);
				return res.send({'error':err});
			}
			else {
				return res.send({'result':result,'status':'successfully saved'});
			}
		});
	};
	
	return this;
};
module.exports = new patientController();