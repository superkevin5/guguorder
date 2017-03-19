/**
 * Created by Luming on 2/14/2017.
 */
angular.module('guguorderapp').factory('RestaurantService', ['$resource','guguConstant',function ($resource,guguConstant) {
    return $resource('/', {restaurantId: '@restaurantId'}, {
        loadRestaurantCategory: {
            url: guguConstant.APIROOTPATH + 'restaurants/getAllRestaurantCategory',
            withCredentials: true,
            method: 'GET',
            isArray: true
        },
        loadRestaurant: {
            url: guguConstant.APIROOTPATH + 'restaurants/get/:restaurantId',
            withCredentials: true,
            method: 'GET',
            isArray: false
        },
        updateRestaurant: {
            url: guguConstant.APIROOTPATH + 'restaurants/put/',
            withCredentials: true,
            method: 'PUT'
        }

    });
}]);