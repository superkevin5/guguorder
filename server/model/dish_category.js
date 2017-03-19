/** user.js **/

var mysqlDB = require('../utility/db');

var dish_category = function(id,category_title) {
	this.id = id;
	this.category_title = category_title;
};

dish_category.insert = function (connection, obj, callback) {
	mysqlDB.insertRecord(connection,'dish_category', obj, callback);
};
dish_category.remove = function (connection,criteria, callback) {
	mysqlDB.removeRecord(connection,'dish_category', criteria, callback);
};
dish_category.update = function (connection,obj, criteria, callback) {
	mysqlDB.updateRecord(connection,'dish_category', obj, criteria, callback);
};

dish_category.select = function (criteria, range, callback) {
	mysqlDB.selectRecord('dish_category', criteria, range, callback);
};

dish_category.findById = function (id, callback) {
	mysqlDB.selectRecord('dish_category', {id:id}, null, callback);
};
module.exports = dish_category;