/** user.js **/

var mysqlDB = require('../utility/db');


var addressRestaurantMap = function (restaurantId, addressId, id) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.addressId = addressId;
};

addressRestaurantMap.insert = function (connection, obj, callback) {
    mysqlDB.insertRecord(connection, 'restaurantandaddressmap', obj, callback);
};
addressRestaurantMap.remove = function (connection, criteria, callback) {
    mysqlDB.removeRecord(connection, 'restaurantandaddressmap', criteria, callback);
};
addressRestaurantMap.update = function (connection, obj, criteria, callback) {
    mysqlDB.updateRecord(connection, 'restaurantandaddressmap', obj, criteria, callback);
};

addressRestaurantMap.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('restaurantandaddressmap', criteria, range, callback);
};

addressRestaurantMap.findById = function (id, callback) {
    mysqlDB.selectRecord('restaurantandaddressmap', {id: id}, null, callback);
};

module.exports = addressRestaurantMap;