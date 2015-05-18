function patientRequestController () {

	var patientRequestSchema = require('../models/patientRequestSchema');

	// Creating New User
	this.createPatientRequest = function (req, res, next) {
	
		console.log('request params',req.params);

		patientRequestSchema.create(req, function(err, result) {

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

	this.getPatientRequest = function () {
		patientRequestSchema.find({}, function(err, result) {

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

module.exports = new patientRequestController();

