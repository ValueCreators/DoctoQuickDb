module.exports = ( function patientRequestSchema() {
	
	var mongoose = require('../db').mongoose;

	var schema = {
		specialistId: {type: Number},
		patientId: {type: Number},
		requestId: {type: Number},
		timestamp: {type: Date},
		doctorId: {type: Number},
		accept: {type: Boolean}
	};
	var collectionName = 'patientRequest';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;

})();