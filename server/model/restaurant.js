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

restaurant.insert = function (connection, obj, callback) {
	mysqlDB.insertRecord(connection,'restaurant', obj, callback);
};
restaurant.remove = function (connection,criteria, callback) {
	mysqlDB.removeRecord(connection,'restaurant', criteria, callback);
};
restaurant.update = function (connection,obj, criteria, callback) {
	mysqlDB.updateRecord(connection,'restaurant', obj, criteria, callback);
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