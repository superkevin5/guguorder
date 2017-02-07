var express = require('express');
var path = require('path');
var morgan = require('morgan');
var log4js = require("log4js");
var fs = require('fs');
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var expressValidator = require('express-validator');
var mysqlDB = require('./utility/db');
var gugulogger = log4js.getLogger('gugulogger');
var passport = require('passport');
var flash = require('connect-flash');

// Route Files
var routes = require('./routes/index');
var restaurants = require('./routes/restaurant');

//init app
var app = express();

// Logger
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.join(__dirname, 'access.log')), 'gugulogger');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
var logStdout = process.stdout;

// Handle Sessions
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//flash
app.use(flash());


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
app.use('/restaurants', restaurants);

app.set('port', (process.env.PORT || 3002));

// Connect to MySQL on start
mysqlDB.connect();


module.exports = app;