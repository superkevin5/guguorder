/**
 * Created by Luming on 2/14/2017.
 */
angular.module('guguorderapp').factory('DishService', ['$resource','guguConstant',function ($resource,guguConstant) {
    return $resource('/', {restaurantId: '@restaurantId'}, {
        upload: {
            url: guguConstant.APIROOTPATH + 'dishes/upload',
            withCredentials: true,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            method: 'POST'
        },
        loadDishes: {
            url: guguConstant.APIROOTPATH + 'dishes/getAll/:restaurantId',
            withCredentials: true,
            method: 'GET',
            isArray:true
        },
        getAllDishCategory: {
            url: guguConstant.APIROOTPATH + 'dishes/getAllDishCategory',
            withCredentials: true,
            method: 'GET',
            isArray:true
        }
    });
}]);