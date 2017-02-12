/**
 * Created by Luming on 2/14/2017.
 */
angular.module('guguorderapp').factory('LoginService', ['$resource','guguConstant',function ($resource,guguConstant) {
    return $resource('/', {}, {
        login: {
            url: guguConstant.APIROOTPATH + 'restaurants/login',
            withCredentials: true,
            method: 'POST'
        },
        testlogin: {
            url: guguConstant.APIROOTPATH + 'restaurants/login',
            method: 'GET'
        }

    });
}]);