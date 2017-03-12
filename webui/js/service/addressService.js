/**
 * Created by Luming on 2/14/2017.
 */
angular.module('guguorderapp').factory('AddressService', ['$resource', 'guguConstant', function ($resource, guguConstant) {
    return $resource('/', {restaurantId: '@restaurantId'}, {
        getAllSuburbs: {
            url: guguConstant.APIROOTPATH + 'address/getAllSuburbs/:state',
            withCredentials: true,
            method: 'GET',
            isArray: true,
            params: {state: '@state'}
        }
    });
}]);