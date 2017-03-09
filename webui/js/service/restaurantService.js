/**
 * Created by Luming on 2/14/2017.
 */
angular.module('guguorderapp').factory('RestaurantService', ['$resource','guguConstant',function ($resource,guguConstant) {
    return $resource('/', {restaurantId: '@restaurantId'}, {
        loadRestaurant: {
            url: guguConstant.APIROOTPATH + 'restaurants/get/:restaurantId',
            withCredentials: true,
            method: 'GET',
            isArray: true
        }
    });
}]);