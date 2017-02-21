/** user.js **/

var mysqlDB = require('../utility/db');
var bcrypt = require('bcryptjs');

var dish = function(dishId,diskImagePath,dishPrice,popularity,description,restaurantId) {
	this.dishId = dishId;
	this.diskImagePath = diskImagePath;
	this.dishPrice = dishPrice;
	this.popularity = popularity;
	this.description = description;
	this.restaurantId = restaurantId;
};

dish.insert = function (obj, callback) {
	mysqlDB.insertRecord('dish', obj, callback);
};
dish.remove = function (criteria, callback) {
	mysqlDB.removeRecord('dish', criteria, callback);
};
dish.update = function (obj, criteria, callback) {
	mysqlDB.updateRecord('dish', obj, criteria, callback);
};

dish.select = function (criteria, range, callback) {
	mysqlDB.selectRecord('dish', criteria, range, callback);
};

dish.findById = function (id, callback) {
	mysqlDB.selectRecord('dish', {dishId:id}, null, callback);
};

module.exports = dish;