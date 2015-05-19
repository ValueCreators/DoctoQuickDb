// Model for the Student
module.exports = (function agentSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		firstName: {type: String},
		lastName: {type: String},
		middleName: {type: String},
		email: {type: String},
		mobile: {type: Number},
		degree: {type: String},
		sex: {type: String},
		adress: {type: String},
		state: {type: String},
		ifcCode: {type: Number},
		accountNumber : {type: Number},
		doctorType : {type: Number},
		fees : {type: Number},
		password: {type: String},
		experiance : {type: Number},
		languageKnown : {type: [] },
		medicalCouncilMembership : {type: String},
		dob : {type : Date},
		status : {type : Boolean},
		timeStamp : {type: Date},
		authenticationToken : {type: String},
		profileImage : {type: String},
		doctorId : {type: Number},
		city: {type: String}
	};
	var collectionName = 'agent';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;

})();