module.exports = function(app) {
	var doctorCtrl = require('./controllers/doctorController');
	var patientCtrl = require('./controllers/patientController');
	var patientRequestCtrl = require('./controllers/patientRequestController');

	app.get('/', function(req, res, next) {
		return res.send("WELCOME TO DOCTOAPP WEB SERVICE !!!!!!!");
	});

	/*Doctor functionality */
	app.post('/registerDoctor', doctorCtrl.registerDoctor);
	app.post('/registerDoctorFromAgent', doctorCtrl.registerDoctorFromAgent);
	app.post('/loginDoctor', doctorCtrl.loginDoctor);

	/*Patient functionality */
	app.post('/registerPatient', patientCtrl.registerPatient);
	app.post('/createPatientRequest', patientRequestCtrl.createPatientRequest);
	app.get('/getPatientRequest', patientRequestCtrl.getPatientRequest);

};