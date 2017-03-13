/** user.js **/

var mysqlDB = require('../utility/db');


var addressRestaurantMap = function (restaurantId, addressId,id) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.addressId = addressId;
};

addressRestaurantMap.insert = function (obj, callback) {
    mysqlDB.insertRecord('restaurantandaddressmap', obj, callback);
};
addressRestaurantMap.remove = function (criteria, callback) {
    mysqlDB.removeRecord('restaurantandaddressmap', criteria, callback);
};
addressRestaurantMap.update = function (obj, criteria, callback) {
    mysqlDB.updateRecord('restaurantandaddressmap', obj, criteria, callback);
};

addressRestaurantMap.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('restaurantandaddressmap', criteria, range, callback);
};

addressRestaurantMap.findById = function (id, callback) {
    mysqlDB.selectRecord('restaurantandaddressmap', {id: id}, null, callback);
};

module.exports = addressRestaurantMap;