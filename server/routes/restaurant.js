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
var Postcode_geo = require('../model/postcode_geo.js');

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


router.put('/put', function (req, res) {

    var accountInfo = req.body;

    var address = accountInfo.address;
    var restaurant = accountInfo.restaurant;
    var postcode_geo = accountInfo.postCode_geo;

    process.nextTick(function () {
        isPostCode_geoValid(postcode_geo).then(function (data) {
            if(!data){
                res.status(GUGUContants.ok).json({error: 'State, suburb or postcode is not matched'});
            } else {
                updateAddressInfo(data,address).then(function(success){
                    return updateRestaurantInfo(restaurant);
                },function(error){
                    res.status(GUGUContants.InternalServerError).json(error);
                }).then(function(success){
                    res.status(GUGUContants.ok).json({message:'Account updated'});
                },function(error){
                    res.status(GUGUContants.InternalServerError).json(error);
                });
            }
        });
    });

});


router.get('/get/:restaurantId', function(req, res){

    var restaurantId = req.params.restaurantId;

    var defer = Q.defer();

    var restaurantRes = {};

    process.nextTick(function(){

        getRestaurantInfo(restaurantId).then(function(restaurant){
            delete restaurant['password'];
            restaurantRes.restaurant = restaurant;
            return getAddressInfo(restaurantId);
        },function(error){
            res.status(GUGUContants.InternalServerError).json(error);
        }).then(function(address){
            restaurantRes.address = address;
            return getPostcodeGeo(address.postcode_geo_fk);
        },function(error){
            res.status(GUGUContants.InternalServerError).json(error);
        }).then(function(postcode_geo){
            restaurantRes.postCode_geo = postcode_geo;
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


function updateRestaurantInfo(restaurant_new) {
    var defer = Q.defer();
    var id = restaurant_new.id;
    var name = restaurant_new.name;
    var description = restaurant_new.description;
    var phoneNumber = restaurant_new.phoneNumber;
    var wechatId = restaurant_new.wechatId;

    Restaurant.update({
        name: name,
        description: description,
        phoneNumber: phoneNumber,
        wechatId: wechatId
    }, {id: id}, function (data) {
        defer.resolve(data);
    }), function (error) {
        defer.reject(error);
    };
    return defer.promise;
};


function updateAddressInfo(postcode_geoData, address_new) {

    var defer = Q.defer();
    var postcode_geo = postcode_geoData[0];
    var postcode_geo_fk_new = postcode_geo.id;
    var addressId = address_new.id;
    var street_new = address_new.street;
    var street_streetNumber_new = address_new.streetNumber;
    var street_unitNumber_new = address_new.unitNumber;
    Address.update({
        street: street_new,
        streetNumber: street_streetNumber_new,
        unitNumber: street_unitNumber_new,
        postcode_geo_fk: postcode_geo_fk_new
    }, {id: addressId}, function (data) {
        defer.resolve(data);
    }), function (error) {
        defer.reject(error);
    };
    return defer.promise;
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
        var addressID = data[0].addressID;
        Address.select({id: addressID}, null, function (hasError, data) {
            if (hasError) {
                defer.reject(data);
            }
            defer.resolve(data[0]);
        });
    });
    return defer.promise;
};


function isPostCode_geoValid(postcode_geo){
    var defer = Q.defer();
    Postcode_geo.select({
        postcode: postcode_geo.postcode,
        suburb: postcode_geo.suburb,
        state: postcode_geo.state
    }, null, function (hasError, data) {
        if (hasError) {
            defer.reject(data);
        }
        defer.resolve(data);
    });
    return defer.promise;
};

function getPostcodeGeo(id){
    var defer = Q.defer();
    Postcode_geo.select({id: id}, null, function (hasError, data) {
        if (hasError) {
            defer.reject(data);
        }
        defer.resolve(data[0]);
    });
    return defer.promise;
};

module.exports = router;
