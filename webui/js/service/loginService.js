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
        isAuthenticated: {
            url: guguConstant.APIROOTPATH + 'restaurants/checkauth',
            method: 'GET'
        },
        logout: {
            url: guguConstant.APIROOTPATH + 'restaurants/logout',
            method: 'GET'
        }
    });
}]);