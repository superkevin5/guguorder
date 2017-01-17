var express = require('express');
var path = require('path');
var morgan = require('morgan');
var log4js = require("log4js");
var fs = require('fs');
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var mysqlDB = require('./utility/db');
var gugulogger = log4js.getLogger('gugulogger');

// Route Files
var routes = require('./routes/index');
var users = require('./routes/users');

//init app
var app = express();

// Logger
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.join(__dirname, 'access.log')), 'gugulogger');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
var logStdout = process.stdout;


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// Handle Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

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
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//// Get User Info
app.get('*', function(req, res, next){
    //if(fbRef.getAuth() != null){
    //    var userRef = new Firebase('https://albumz01.firebaseio.com/users/');
    //    userRef.orderByChild("uid").startAt(fbRef.getAuth().uid).endAt(fbRef.getAuth().uid).on("child_added", function(snapshot) {
    //        res.locals.user = snapshot.val();
    //    });
    //}
    next();
});

// Routes
app.use('/', routes);
// app.use('/genres', genres);
app.use('/users', users);

app.set('port', (process.env.PORT || 3002));

// Connect to MySQL on start
mysqlDB.connect(mysqlDB.MODE_PRODUCTION, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        gugulogger.error('Unable to connect to MySQL. due to ' + err);
        process.exit(1)
    } else {
        gugulogger.info('Connect to local MySQL successfully');
        console.log('Connect to local MySQL successfully');
        app.listen(app.get('port'), function () {
            console.log('Server starts on port: ' + app.get('port'));
        });
    }
});


module.exports = app;