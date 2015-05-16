function transactionController () {

	var transactionSchema = require('../models/transactionSchema');

	// Creating New User
	this.createTransaction = function (req, res, next) {
	
		console.log('request params',req.params);

		transactionSchema.create(req, function(err, result) {

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

module.exports = new transactionController();