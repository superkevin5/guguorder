/** user.js **/

var mysqlDB = require('../utility/db');


var address = function (id, street, streetNumber, unitNumber, postcode_geo_fk) {
    this.id = id;
    this.street = street;
    this.streetNumber = streetNumber;
    this.unitNumber = unitNumber;
    this.postcode_geo_fk = postcode_geo_fk;
};

address.insert = function (connection, obj, callback) {
    mysqlDB.insertRecord(connection, 'address', obj, callback);
};
address.remove = function (connection, criteria, callback) {
    mysqlDB.removeRecord(connection, 'address', criteria, callback);
};
address.update = function (connection, obj, criteria, callback) {
    mysqlDB.updateRecord(connection, 'address', obj, criteria, callback);
};

address.select = function (criteria, range, callback) {
    mysqlDB.selectRecord('address', criteria, range, callback);
};

address.findById = function (id, callback) {
    mysqlDB.selectRecord('address', {id: id}, null, callback);
};

module.exports = address;