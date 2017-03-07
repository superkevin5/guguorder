/** user.js **/

var mysqlDB = require('../utility/db');
var bcrypt = require('bcryptjs');

var dish = function(dishId,dishImagePath,dishPrice,popularity,description,title,restaurantId) {
	this.dishId = dishId;
	this.dishImagePath = dishImagePath;
	this.dishPrice = dishPrice;
	this.popularity = popularity;
	this.description = description;
	this.title = title;
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