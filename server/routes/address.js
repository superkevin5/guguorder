var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var Address = require('../model/address.js');
var Postcode_geo = require('../model/postcode_geo.js');

router.get('/getAllSuburbs/:state', function(req, res){

    var state = req.params.state;
    Postcode_geo.select({state: state}, null, function (hasError, data) {
        if (hasError) {
            res.status(GUGUContants.InternalServerError).json(data);
        }
        res.status(GUGUContants.ok).json(data);
    });

});






module.exports = router;
