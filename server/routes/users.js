var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var logger = log4js.getLogger('gugulogger');

router.get('/register', function(req, res, next) {

	console.log('sss');
	res.json({"foo": "bar"});
});

router.get('/login', function(req, res, next) {
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

	if(errors && errors.length >0 ){
		res.status(GUGUContants.NotAcceptable);
		res.json(new GUGUError(GUGUContants.NotAcceptable, {
			message: errors
		}));
	}
    //
	// // Validation
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('password', 'Password is required').notEmpty();
    //
	// var errors = req.validationErrors();
    //
	// if(errors){
	// 	res.render('users/login', {
	// 		errors: errors
	// 	});
	// } else {
	// 	fbRef.authWithPassword({
	// 		email: email,
	// 		password: password
	// 	}, function(error, authData){
	// 		if(error){
	// 			console.log("Login Failed: ", error);
	// 			req.flash('error_msg', 'Login Failed');
	// 			res.redirect('/users/login');
	// 		} else {
	// 			console.log("Authenticated user with uid:",authData);
    //
	// 			req.flash('success_msg', 'You are now logged in');
	// 			res.redirect('/albums');
	// 		}
	// 	});
	// }
});

// Logout User
router.get('/logout', function(req, res){

});
module.exports = router;
