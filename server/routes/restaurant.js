var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var logger = log4js.getLogger('gugulogger');
var restaurantDao = require('../model/restaurant.js');



router.get('/register', function(req, res, next) {

	console.log('sss');
	res.json({"foo": "bar"});
});

router.get('/login', function(req, res, next) {

	restaurantDao.select({username:'northern'},null,function(flag,data){
		console.log(data);
		console.log('www');
	});


	res.json({"foo": "bar"});
});

router.post('/register', function(req, res, next) {

});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var token = req.body.token;
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('token', 'Token is required').notEmpty();
	var errors = req.validationErrors();

	if(errors && errors.length > 0 ){
		res.status(GUGUContants.NotAcceptable);
		res.json(new GUGUError(GUGUContants.NotAcceptable, {
			message: errors
		}));
		return;
	}

	restaurantDao.select({username:email, password: token},null,function(hasError, data){
		if(hasError) {
			res.status(GUGUContants.InternalServerError);
			res.json(new GUGUError(GUGUContants.InternalServerError, {
				message: data
			}));
		} else {
			res.status(GUGUContants.ok);
			res.json(data);
		}
	});
});

// Logout User
router.get('/logout', function(req, res){

});
module.exports = router;
