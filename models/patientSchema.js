// Model for the Student
module.exports = (function patientSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		firstName: {type: String},
		lastName: {type: String},
		middleName: {type: String},
		email: {type: String},
		age: {type: Number},
		mobile: {type: Number},
		sex: {type: String},
		languageKnown : {type: [] },
		patientId : {type: Number},
		password: {type: String},
		ifcCode: {type: Number},
		accountNumber : {type: Number},
		fees : {type: Number},
		dob : {type : Date},
		status : {type : Boolean},
		timeStamp : {type: Date},
		authenticationToken : {type: String},
		profileImage : {type: String},
		walletId: {type: Number},
		city: {type: String}
	};
	var collectionName = 'patient';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;
})();