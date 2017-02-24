/** user.js **/

var mysqlDB = require('../utility/db');
var bcrypt = require('bcryptjs');

var restaurant = function(id,name,username,password,rating,description,phoneNumber,wechatId,imagePath) {
	this.id = id;
	this.name = name;
	this.username = username;
	this.rating = rating;
	this.description = description;
	this.phoneNumber = phoneNumber;
	this.wechatId = wechatId;
	this.imagePath = imagePath;
};

restaurant.insert = function (obj, callback) {
	mysqlDB.insertRecord('restaurant', obj, callback);
};
restaurant.remove = function (criteria, callback) {
	mysqlDB.removeRecord('restaurant', criteria, callback);
};
restaurant.update = function (obj, criteria, callback) {
	mysqlDB.updateRecord('restaurant', obj, criteria, callback);
};

restaurant.select = function (criteria, range, callback) {
	mysqlDB.selectRecord('restaurant', criteria, range, callback);
};

restaurant.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		callback(null, isMatch);
	});
};


restaurant.findById = function (id, callback) {
	mysqlDB.selectRecord('restaurant', {id:id}, null, callback);
};

module.exports = restaurant;