/** user.js **/

var mysqlDB = require('../utility/db');


var address = function (id, street, streetNumber, unitNumber, postcode_geo_fk, city_fk) {
    this.id = id;
    this.street = street;
    this.streetNumber = streetNumber;
    this.unitNumber = unitNumber;
    this.postcode_geo_fk = postcode_geo_fk;
    this.city_fk = city_fk;
};

address.insert = function (obj, callback) {
    mysqlDB.insertRecord('address', obj, callback);
};
address.remove = function (criteria, callback) {
    mysqlDB.removeRecord('address', criteria, callback);
};
address.update = function (obj, criteria, callback) {
    mysqlDB.updateRecord('address', obj, criteria, callback);
};

address.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('address', criteria, range, callback);
};

address.findById = function (id, callback) {
    mysqlDB.selectRecord('address', {id: id}, null, callback);
};

module.exports = address;