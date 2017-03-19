/** postcodes_geo.js **/

var mysqlDB = require('../utility/db');


var postcode_geo = function (id, postcode, suburb, state, latitude, longtitude) {
    this.id = id;
    this.postcode = postcode;
    this.suburb = suburb;
    this.state = state;
    this.latitude = latitude;
    this.longtitude = longtitude;
};

postcode_geo.insert = function (connection, obj, callback) {
    mysqlDB.insertRecord(connection, 'postcodes_geo', obj, callback);
};
postcode_geo.remove = function (connection, criteria, callback) {
    mysqlDB.removeRecord(connection, 'postcodes_geo', criteria, callback);
};
postcode_geo.update = function (connection, obj, criteria, callback) {
    mysqlDB.updateRecord(connection, 'postcodes_geo', obj, criteria, callback);
};

postcode_geo.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('postcodes_geo', criteria, range, callback);
};

postcode_geo.findById = function (id, callback) {
    mysqlDB.selectRecord('postcodes_geo', {dishId: id}, null, callback);
};

module.exports = postcode_geo;