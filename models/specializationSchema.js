// Model for the Student
module.exports = (function speacializationSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		id: {type: Number},
		name: {type: String},
		description: {type: String}
	};
	var collectionName = 'speacialization';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;
})();