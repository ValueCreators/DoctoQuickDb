var restify = require('restify');
var config = require('./config');
var app = restify.createServer({name:'doctoQuickDb'});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(restify.CORS());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.listen(config.port, function() {
	console.log('server listening on port number', config.port);
});
var routes = require('./routes')(app);