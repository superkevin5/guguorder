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

postcode_geo.insert = function (obj, callback) {
    mysqlDB.insertRecord('postcodes_geo', obj, callback);
};
postcode_geo.remove = function (criteria, callback) {
    mysqlDB.removeRecord('postcodes_geo', criteria, callback);
};
postcode_geo.update = function (obj, criteria, callback) {
    mysqlDB.updateRecord('postcodes_geo', obj, criteria, callback);
};

postcode_geo.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('postcodes_geo', criteria, range, callback);
};

postcode_geo.findById = function (id, callback) {
    mysqlDB.selectRecord('postcodes_geo', {dishId: id}, null, callback);
};

module.exports = postcode_geo;