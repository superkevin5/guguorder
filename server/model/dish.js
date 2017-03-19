/** user.js **/

var mysqlDB = require('../utility/db');
var bcrypt = require('bcryptjs');

var dish = function (dishId, dishImagePath, dishPrice, popularity, description, title, restaurantId) {
    this.dishId = dishId;
    this.dishImagePath = dishImagePath;
    this.dishPrice = dishPrice;
    this.popularity = popularity;
    this.description = description;
    this.title = title;
    this.restaurantId = restaurantId;
};

dish.insert = function (connection, obj, callback) {
    mysqlDB.insertRecord(connection, 'dish', obj, callback);
};
dish.remove = function (connection, criteria, callback) {
    mysqlDB.removeRecord(connection, 'dish', criteria, callback);
};
dish.update = function (connection, obj, criteria, callback) {
    mysqlDB.updateRecord(connection, 'dish', obj, criteria, callback);
};

dish.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('dish', criteria, range, callback);
};

dish.findById = function (id, callback) {
    mysqlDB.selectRecord('dish', {dishId: id}, null, callback);
};

module.exports = dish;