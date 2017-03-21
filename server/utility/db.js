/**
 * Created by Luming on 1/17/2017.
 */
var mysql = require('mysql');
var log4js = require("log4js");
var logger = log4js.getLogger('gugulogger');
var GUGUContants = require('../utility/constant.js');
var pool = mysql.createPool(GUGUContants.dbOptions);
var Q = require('q');

exports.getConnection = function () {
    return mysql.createConnection(GUGUContants.dbOptions);
};


exports.getConnectionFromPool = function () {

    var defer = Q.defer();
    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error('unable to connect to mysql due to ' + err);
            defer.reject(err);
            throw err;
        } else {
            console.log('connection obtained');
            defer.resolve(connection);
        }
    });
    return defer.promise;
};


exports.connect = function (req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error('unable to connect to mysql due to ' + err);
        }
        logger.debug('connected as id ' + connection.threadId);
        connection.release();
        logger.debug('Connection ' + connection.threadId + ' released');
    });
};

exports.updateRecord = function (connection, table, obj, criteria, callback) {
    var sql = 'update ' + table + ' set ? where ? ';

    connection.query(sql, [obj, criteria], function (err, results) {
        if (err) {
            logger.error(err);
            callback(true, err);
            throw err;
        }
        var str = 'Last updated ID:' + results.insertId;
        callback(false, str);
    });
};

exports.insertRecord = function (connection, table, obj, callback) {
    connection.query('INSERT INTO ' + table + ' SET ?', obj, function (err, results) {
        if (err) {
            logger.error(err);
            callback(true, err);
            throw err;
        }
        var str = results.insertId;
        callback(false, str);
    });
};

exports.selectRecord = function (table, criteria, range, callback) {
    var sql = "SELECT * FROM ??";
    // get a connection from the pool

    if (Object.keys(criteria).length !== 0) {
        sql += ' WHERE ';
    }

    var options = [table], link = '';
    for (var key in criteria) {
        options.push(key);
        options.push(criteria[key]);
        sql += link + '??=?';
        link = ' and ';
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error(err);
            callback(true, err);
            connection.release();
            return;
        }
        // make the query
        connection.query(sql, options, function (err, results) {
            if (err) {
                logger.error(err);
                callback(true, err);
                connection.release();
                return;
            }

            if (!results || Array.isArray(results) && results.length === 0) {
                callback(false, null);
            } else {
                callback(false, results);
            }
            connection.release();
        });
    });
};