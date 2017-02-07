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

        var restaurantName = req.body.name;
        var restaurantUsername = req.body.username;
        var restaurantPassword = req.body.password;
        var restaurantDescription = req.body.description;
        var restaurantPhoneNumber = req.body.phoneNumber;
        var restaurantWechatId = req.body.wechatId;
        var restaurantImagePath = req.body.imagePath;
        //var restaurantAddress = req.body.imagePath;

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('username', 'username is required').notEmpty();
        req.checkBody('password', 'password is required').notEmpty();
        req.checkBody('description', 'description is required').notEmpty();
        req.checkBody('phoneNumber', 'phoneNumber is required').notEmpty();
        var errors = req.validationErrors();
        if(errors && errors.length >0 ){
            res.status(GUGUContants.NotAcceptable);
            res.json(new GUGUError(GUGUContants.NotAcceptable, {
                message: errors
            }));
            return;
        }

    var restaurantNew = {
        name: restaurantName,
        username: restaurantUsername,
        password: restaurantPassword,
        rating: null,
        description: restaurantDescription,
        phoneNumber: restaurantPhoneNumber,
        wechatId:restaurantWechatId,
        imagePath: restaurantImagePath
    };

    bcrypt.hash(restaurantNew.password, 10, function(err, hash) {
        // Store hash in your password DB.
        restaurantNew.password = hash;
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


        restaurant.select({username: username}, null, function (hasError, data) {
            if (hasError) {
                return done(data);
            } else {
                if (data.length > 1) {
                    return done(null, false, {message: 'Duplicated username exists'});
                } else if (data.length === 1) {

                    var hash = data[0].password;
                    bcrypt.compare(password, hash).then(function (res) {
                        if (res) {
                            return done(null, data);
                        } else {
                            return done(null, false, {message: 'Password not matched'});
                        }
                    });
                }
                else {
                    return done(null, false, {message: 'Username does not exist'});
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
