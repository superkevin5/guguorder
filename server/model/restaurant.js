/** user.js **/

var mysqlDB = require('../utility/db');


exports.insert = function (obj, callback) {
	mysqlDB.insertRecord('restaurant', obj, callback);
};
exports.remove = function (criteria, callback) {
	mysqlDB.removeRecord('restaurant', criteria, callback);
};
exports.update = function (obj, criteria, callback) {
	mysqlDB.updateRecord('restaurant', obj, criteria, callback);
};
exports.select = function (criteria, range, callback) {
	mysqlDB.selectRecord('restaurant', criteria, range, callback);
};

