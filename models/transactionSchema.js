module.exports = ( function transactionSchema() {
	
	var mongoose = require('../db').mongoose;

	var schema = {
		transactionId: {type: Number},
		walletId: {type: Number},
		transactionAmount: {type: Number},
		credit: {type: Number},
		debit: {type: Number},
		timestamp: {type: Date},
		patientId: {type: Number},
		doctorId: {type: Number}
	};
	var collectionName = 'transaction';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;

})();