var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var Q = require('q');
var logger = log4js.getLogger('gugulogger');
var Restaurant = require('../model/restaurant.js');
var Address = require('../model/address.js');
var AddressRestaurantMap = require('../model/addressRestaurantMap.js');

router.post('/register', function (req, res, next) {

        var restaurantName = req.body.name;
        var restaurantUsername = req.body.username;
        var restaurantPassword = req.body.password;
        var restaurantDescription = req.body.description;
        var restaurantPhoneNumber = req.body.phoneNumber;
        var restaurantWechatId = req.body.wechatId;
        var restaurantImagePath = req.body.imagePath;

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
        Restaurant.insert(restaurantNew, function(hasError,data){
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
    return res.send('login test');
});


var isAuthenticated = function(req,res,next){
    if(req.isAuthenticated()) {
        return next();
    }
    else
        return res.status(401).json({
            error: 'User not authenticated'
        })
};

router.get('/checkauth', isAuthenticated, function(req, res){
    res.status(200).json({
        status: 'success'
    });
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (restaurantID, done) {
    Restaurant.findById(restaurantID, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'token'
    },
    function (username, password, done) {

        Restaurant.select({username: username}, null, function (hasError, data) {
            if (hasError) {
                return done(data);
            } else {

                if (data && data.length > 1) {
                    return done(null, false, {message: 'Duplicated username exists'});
                } else if (data && data.length === 1) {

                    var hash = data[0].password;
                    bcrypt.compare(password, hash).then(function (res) {
                        if (res) {
                            return done(null, data[0]);
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
        req.logout();
        if (err) {
            return next(err)
        }

        if (!restaurant) {
            req.logout();
            res.status(GUGUContants.ok);
            return res.json({message:info.message});
        }
        req.logIn(restaurant, function (err) {
            if (err) {
                return next(err);
            }
            logger.info('Login success!');
            return res.json(restaurant);
        });
    })(req, res, next);
});

// Logout User
router.get('/logout', function (req, res) {
    // res.clearCookie('guguRestaurant');
    req.logout();
    req.session.destroy();
    res.json('session cleared');
});

router.get('/search/:username', function (req, res) {
    req.checkParams('username', 'username is empty').notEmpty();
    var username = req.params.username;
    Restaurant.select({username: username}, null, function (hasError, data) {
    });
    req.session.destroy();
    res.status(GUGUContants.ok).json('session cleared');
});


router.get('/get/:restaurantId', function(req, res){

    var restaurantId = req.params.restaurantId;

    var defer = Q.defer();

    var restaurantRes = {};

    process.nextTick(function(){


        getRestaurantInfo(restaurantId).then(function(restaurant){
            restaurantRes.restaurant = restaurant;
            return getAddressInfo(restaurantId);
        },function(error){
            res.status(GUGUContants.InternalServerError).json(error);
        }).then(function(address){
            restaurantRes.address = address;
            res.status(GUGUContants.ok).json(restaurantRes);
        },function(error){
            res.status(GUGUContants.InternalServerError).json(error);
        });


    });

});



function hashPassword(password) {
    var salt = bcrypt.hashSync("bacon");
    var hashedPassword = bcrypt.hashSync( password, salt );
    return hashedPassword;
};


function getRestaurantInfo(restaurantId) {
    var defer = Q.defer();
    Restaurant.select({id: restaurantId}, null, function (hasError, data) {
        if (hasError) {
            defer.reject(data);
        }
        defer.resolve(data[0]);
    });
    return defer.promise;
};

function getAddressInfo(restaurantId) {

    var defer = Q.defer();
    AddressRestaurantMap.select({restaurantID: restaurantId}, null, function (hasError, data) {
        console.log(data);
        var addressID = data[0].addressID;
        Address.select({id: addressID}, null, function (hasError, data) {
            if (hasError) {
                defer.reject(data);
            }
            defer.resolve(data);
        });
    });
    return defer.promise;
};

function getPostcodeGeo(id){


};

module.exports = router;
