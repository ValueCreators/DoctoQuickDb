module.exports = function(app) {
	var doctorCtrl = require('./controllers/doctorController');
	var patientCtrl = require('./controllers/patientController');

	app.get('/', function(req, res, next) {
		return res.send("WELCOME TO DOCTOAPP WEB SERVICE !!!!!!!");
	});

	app.post('/registerDoctor', doctorCtrl.registerDoctor);
	app.post('/registerPatient', patientCtrl.registerPatient);

};