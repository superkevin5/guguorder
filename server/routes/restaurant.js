var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var logger = log4js.getLogger('gugulogger');
var restaurant = require('../model/restaurant.js');

router.post('/register', function (req, res, next) {

    var restaurantNew ={name: 'ddd'};
    restaurant.insert(restaurantNew, function(hasError,data){
        if(!hasError) {
            res.status(GUGUContants.ok);
            res.json(data);
        } else {
            res.status(GUGUContants.InternalServerError);
            res.end();
        }
    });
});

router.get('/login', function (req, res, next) {
    res.json({"foo": "bar"});
});


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    restaurant.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'token'
    },
    function (username, password, done) {

        console.log(hashPassword(password));
        restaurant.select({username: username, password: password}, null, function (hasError, data) {
            if (hasError) {
                return done(data);
            } else {
                if (data.length > 0) {
                    return done(null, data);
                } else {
                    return done(null, false, {message: 'Invalid username or password'});
                }
            }
        });
    }));

router.post('/login', bodyParser.urlencoded({extended: true}), function (req, res, next) {
    passport.authenticate('local', function (err, restaurant, info) {
        if (err) {
            return next(err)
        }
        if (!restaurant) {
            req.session.messages = [info.message];
            res.status(GUGUContants.Forbidden);
            return res.json(req.session.messages);
        }
        req.logIn(restaurant, function (err) {
            if (err) {
                return next(err);
            }
            res.cookie('guguRestaurant', restaurant, {maxAge: 900000, httpOnly: true});
            req.session.restaurant = restaurant;
            return res.json(restaurant);
        });
    })(req, res, next);
});

// Logout User
router.get('/logout', function (req, res) {
    res.clearCookie('guguRestaurant');
});


function hashPassword(password) {
    var salt = bcrypt.hashSync("bacon");
    var hashedPassword = bcrypt.hashSync( password, salt );
    return hashedPassword;
};

module.exports = router;
