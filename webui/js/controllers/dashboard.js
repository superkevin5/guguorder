'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
    .controller('DashboardCtrl', function ($scope, $mdSidenav, $mdBottomSheet, $stateParams, $state, $mdDialog, LoginService, DishService, blockUI) {
        var restaurantId = $stateParams.restaurantId;

        $scope.restaurantId = restaurantId;

        $scope.showMobileMainHeader = true;

        $scope.upload = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                locals: {
                    restaurantId: $scope.restaurantId
                },
                templateUrl: '../views/uploadDishModal.html',
                controller: 'DishUploadDialogController'
            });
        };


        $scope.logout = function () {
            blockUI.start();
            LoginService.logout().$promise.then(function () {
                $state.go('login');
            }).finally(function () {
                blockUI.stop();
            });
        };

        $scope.showListBottomSheet = function ($event) {
            $mdBottomSheet.show({
                templateUrl: '/bottom-list-sheet.html',
                targetEvent: $event
            });
        };

        $scope.loadAllDishes = function () {
            DishService.loadDishes({restaurantId: $scope.restaurantId}).$promise.then(function (dishes) {
                $scope.dishes = dishes;
                console.log(dishes);
            });
        };
        $scope.loadAllDishes();
    });


angular
    .module('guguorderapp')
    .controller('DishUploadDialogController', function ($scope, $http, $mdDialog, DishService, restaurantId, blockUI, toaster) {
        console.log(restaurantId);
        $scope.dish = {};
        $scope.cancel = function () {
            $mdDialog.hide();
        };

        $scope.$watch('files.length', function (newVal, oldVal) {
            console.log($scope.files);
        });

        $scope.saveDish = function ($event) {
            blockUI.start('Uploading...');
            var formData = new FormData();
            angular.forEach($scope.files, function (obj) {
                if (!obj.isRemote) {
                    formData.append('files[]', obj.lfFile);
                }
            });

            formData.append('title', $scope.dish.title);
            formData.append('description', $scope.dish.description);
            formData.append('dishPrice', $scope.dish.price);
            formData.append('restaurant_fk', restaurantId);

            DishService.upload({}, formData).$promise.then(function () {
                toaster.pop('success', 'Dish uploaded');
                blockUI.stop();
                $scope.cancel();
            }, function (error) {
                toaster.pop('error', 'Fail to upload dish');
                blockUI.stop();
            });
        };
    });
