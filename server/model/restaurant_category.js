/** user.js **/

var mysqlDB = require('../utility/db');

var restaurant_category = function(id,category_title) {
	this.id = id;
	this.category_title = category_title;
};

restaurant_category.insert = function (connection, obj, callback) {
	mysqlDB.insertRecord(connection,'restaurant_category', obj, callback);
};
restaurant_category.remove = function (connection,criteria, callback) {
	mysqlDB.removeRecord(connection,'restaurant_category', criteria, callback);
};
restaurant_category.update = function (connection,obj, criteria, callback) {
	mysqlDB.updateRecord(connection,'restaurant_category', obj, criteria, callback);
};

restaurant_category.select = function (criteria, range, callback) {
	mysqlDB.selectRecord('restaurant_category', criteria, range, callback);
};

restaurant_category.findById = function (id, callback) {
	mysqlDB.selectRecord('restaurant_category', {id:id}, null, callback);
};
module.exports = restaurant_category;