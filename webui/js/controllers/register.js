'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};
angular.module('guguorderapp')
    .directive("compareTo", compareTo)
    .controller('RegisterCtrl', function ($scope, $mdSidenav, $mdBottomSheet, $stateParams, $state, $mdDialog, LoginService, DishService, blockUI, guguConstant, RestaurantService) {

        $scope.account = {
            restaurant: {},
            postCode_geo: {},
            address: {}
        };
        $scope.stateList = guguConstant.state_list;

        $scope.submit = function () {
            RestaurantService.register({}, $scope.account).$promise.then(function () {


            });
        };


        RestaurantService.loadRestaurantCategory().$promise.then(function (data) {
            $scope.restaurantCategories = data;
        });

    });



