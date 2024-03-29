'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
    .controller('DashboardCtrl', function ($scope, $mdSidenav, $mdBottomSheet, $stateParams, $state, $mdDialog, LoginService, DishService, blockUI, guguConstant) {
        var restaurantId = $stateParams.restaurantId;

        $scope.restaurantId = restaurantId;

        $scope.showMobileMainHeader = true;

        $scope.upload = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                onRemoving: function (event, removePromise) {
                    $scope.loadAllDishes();
                },
                locals: {
                    restaurantId: $scope.restaurantId
                },
                templateUrl: '../views/uploadDishModal.html',
                controller: 'DishUploadDialogController'
            });
        };

        $scope.updateAccount = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                onRemoving: function (event, removePromise) {
                    $scope.loadAllDishes();
                },
                locals: {
                    restaurantId: $scope.restaurantId
                },
                templateUrl: '../views/accountModal.html',
                controller: 'AccountDialogController'
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
                $scope.dishes = $scope.buildGridModel(dishes);
                console.log(dishes);
            });
        };

        $scope.buildGridModel = function (tileTmpl) {
            var results = [];

            for (var j = 0; j < tileTmpl.length; j++) {
                var it = angular.copy(tileTmpl[j]);
                it.dishImagePath = angular.copy('http://localhost:9001' + it.dishImagePath);
                console.log(it.dishImagePath);
                it.span = {row: 1, col: 1};

                results.push(it);
            }
            return results;
        };

        $scope.loadAllDishes();
    });


angular
    .module('guguorderapp')
    .controller('AccountDialogController', function ($scope, $http, $mdDialog, guguConstant, RestaurantService, AddressService, restaurantId, blockUI, toaster) {

        $scope.restaurantId = restaurantId;

        $scope.account = {};

        $scope.stateList = guguConstant.state_list;


        RestaurantService.loadRestaurantCategory().$promise.then(function (data) {
            $scope.restaurantCategories = data;
            RestaurantService.loadRestaurant({restaurantId: $scope.restaurantId}).$promise.then(function (data) {
                $scope.account = data;
                console.log(data);
            });
        });

        $scope.getAllSuburbsByState = function (state) {
            AddressService.getAllSuburbs({state: state}, {}).$promise.then(function (data) {
                $scope.availableSuburbList = data;
                console.log(data);
            });
        };
        $scope.updateRestaurant = function () {
            RestaurantService.updateRestaurant({}, $scope.account).$promise.then(function (data) {
                if (data.error) {
                    toaster.pop('error', data.error);
                    blockUI.stop();
                } else {
                    toaster.pop('success', data.message);
                    $scope.cancel();
                }
            });
        };

        $scope.cancel = function () {
            $mdDialog.hide();
        };

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

        $scope.getAllDishCategory = function(){
            DishService.getAllDishCategory().$promise.then(function(categories){
                $scope.categories = categories;
            });
        };
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
            formData.append('dish_category_fk', $scope.dish.category);

            DishService.upload({}, formData).$promise.then(function () {
                toaster.pop('success', 'Dish uploaded');
                blockUI.stop();
                $scope.cancel();
            }, function (error) {
                toaster.pop('error', 'Fail to upload dish');
                blockUI.stop();
            });
        };
        $scope.getAllDishCategory();
    });
