/**
 * Created by Luming on 1/17/2017.
 */
var mysql = require('mysql');
var log4js = require("log4js");
var logger = log4js.getLogger('gugulogger');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'a',
    database : 'guguorder',
    debug    :  false
});


exports.connect = function (req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            logger.error('unable to connect to mysql due to ' + err);
        }
        logger.debug('connected as id ' + connection.threadId);
        connection.release();
        logger.debug('Connection ' +  connection.threadId + ' released');
    });
};

exports.updateRecord = function (model, obj, criteria, callback){
    var sql = 'update ?? set ? where ';
    var options = [model.name, obj], link = '';
    for (var key in criteria) {
        options.push(key);
        options.push(criteria[key]);
        sql += link + '?? = ?';
        link = ' and ';
    }
    sql += ';';
    pool.query(sql, options, callback);
};




exports.selectRecord = function(table, criteria, range, callback) {
    var sql = "SELECT * FROM ?? WHERE "  ;
    // get a connection from the pool

    var options = [table], link = '';
    for (var key in criteria) {
        options.push(key);
        options.push(criteria[key]);
        sql += link + '??=?';
        link = ' and ';
    }

    pool.getConnection(function(err, connection) {
        if(err) { logger.error(err); callback(true); return; }
        // make the query
        connection.query(sql, options, function(err, results) {
            connection.release();
            if(err) {
                logger.error(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};