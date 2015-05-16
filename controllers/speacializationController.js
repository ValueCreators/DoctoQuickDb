function speacilaizationController () {

	var SpeacializationTable = require('../models/speacializationSchema');

	// Creating New User
	this.createSpeacialization = function (req, res, next) {
	
		console.log('request params',req.params);

		SpeacializationTable.create(req, function(err, result) {

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

module.exports = new speacilaizationController();

