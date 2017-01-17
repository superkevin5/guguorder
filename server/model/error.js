/**
 * Created by Luming on 1/17/2017.
 */

var Error = function (code, data) {
    this.code=code;
    this.data = data;
};
Error.prototype.data = {};
Error.prototype.code = 0;


module.exports = Error;