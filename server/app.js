var express = require('express');
var path = require('path');
var morgan = require('morgan');
var log4js = require("log4js");
var fs = require('fs');
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var expressValidator = require('express-validator');
var mysqlDB = require('./utility/db');
var gugulogger = log4js.getLogger('gugulogger');
var passport = require('passport');
var flash = require('connect-flash');
var GUGUContants = require('./utility/constant.js');
// Route Files
var routes = require('./routes/index');
var restaurants = require('./routes/restaurant');
var address = require('./routes/address');
var dishes = require('./routes/dish');

//init app
var app = express();

// Logger
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.join(__dirname, 'access.log')), 'gugulogger');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
var logStdout = process.stdout;

//Session
var connection = mysqlDB.getConnection(GUGUContants.dbOptions2); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
    secret: 'test session',
    resave: true,
    store: sessionStore,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

//flash
app.use(flash());

app.use('/dish', express.static('dish'));

// Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


// Routes
app.use('/', routes);
// app.use('/genres', genres);
app.use('/restaurants', restaurants);
app.use('/address', address);
app.use('/dishes', dishes);

app.set('port', (process.env.PORT || 3002));

// Connect to MySQL on start
mysqlDB.getConnectionFromPool().then(function(connection){
    var config = connection.config;
    console.log('Test database \'' + config.database + '\' connected on port \'' + config.port + '\' as user \'' + config.user + '\'');
    connection.release();
    console.log('connection released');
}).catch(function(error){
    console.log('connection failed due to ' + error);
    gugulogger.error('unable to connect to mysql due to ' + error);
});

module.exports = app;