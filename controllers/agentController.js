function agentController () {
	
	var async = require('async');
	var config = require('../config');
	var common = require('../utils/common');
	var request = require('request');
	var cloudinary = require('cloudinary');
	var AgentTable = require('../models/agentSchema');

	this.registerAgent = function (req, res, next) {


		async.waterfall([

			checkIfAgentFound.bind(undefined, req.params.mobile);
			createAgent.bind(undefined, req.params)
		], function final (err, data) {
			console.log('finally after doing agent found r not',err, data);
			if (err) {
				return res.send({'error':err});
			} else {
				return res.send({'result':data,'status':'successfully saved'});
			}
		});
	};

	this.loginAgent = function (req, res, next) {
		AgentTable.findOne({
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

	function checkIfAgentFound (mobileNumber, callback) {
		AgentTable.find({
			mobile: mobileNumber
		}, function (err, data) {
			if (err) {
				return callback(err);
			}

			//  JSON Object contains authkey if user exists
  			var obj = {};
  
  			if (data.length === 0) {
				obj.is_found = false;
				return callback(null, obj);
			}

			console.log('response data',data);
			obj.is_found = true;
			obj.phone_number = data[0].mobile;
			obj.message = 'Already registered';
			return callback(null, obj);
		})
	};

	function createAgent (req, obj, callback) {
		console.log('create doctor', req, obj);
		if (!obj.is_found) {
			AgentTable.create(req, function(err, result) {

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
			return callback(obj);
		}
	};

}

module.exports = new agentController();