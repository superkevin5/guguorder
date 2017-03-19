var express = require('express');
var router = express.Router();
var GUGUError = require('../model/error.js');
var GUGUContants = require('../utility/constant.js');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var formidable = require('formidable');
var Dishes = require('../model/dish.js');
var fs = require('fs');
var mysqlDB = require('../utility/db');

router.get('/getAll/:restaurantId', function (req, res) {

    var restaurantId = req.params.restaurantId;

    Dishes.select({restaurant_fk: restaurantId}, null, function (hasError, data) {
        if (hasError) {
            res.status(GUGUContants.InternalServerError).json(data);
            return;
        }
        res.status(GUGUContants.ok).json(data);
    });
});


router.post('/upload', function (req, res, next) {

    var restaurantId = req.user[0].id;
    var folderPath = './dish/' + restaurantId;
    var dbFilePath = null;
    var filePath = null;
    var dishNew = {restaurant_fk: restaurantId};
    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath);
    }
    var form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });

    form.on('field', function (name, field) {
        dishNew[name] = field;
        console.log('Got a field:', name);
    });

    form.on('error', function (err) {
        next(err);
    });

    form.on('aborted', function (err) {
        console.log("user aborted upload");
    });

    form.on('fileBegin', function (name, file) {
        filePath = folderPath + '/' + new Date().getTime() + '-' + file.name;
        file.path = filePath;
        dbFilePath = filePath.replace('.', '');
        console.log('begin');
    });

    form.on('end', function () {
        dishNew['dishImagePath'] = dbFilePath;
        mysqlDB.getConnectionFromPool().then(function (connection) {
            connection.beginTransaction(function (err) {
                Dishes.insert(connection, dishNew, function (hasError, data) {
                    if (!hasError) {

                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    next(err);
                                });
                            }
                            console.log('success!');
                        });
                        connection.release();
                        res.status(GUGUContants.ok);
                        res.json(data);
                    } else {
                        connection.rollback(function () {
                            next(data);
                        });
                        connection.release();
                        res.status(GUGUContants.InternalServerError);
                        res.end();
                    }
                });
            });
        });
    });

    form.parse(req, function (err, fields, files) {

    });
});

module.exports = router;
