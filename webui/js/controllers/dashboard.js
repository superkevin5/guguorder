'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
    .controller('DashboardCtrl', function ($scope, $mdSidenav, $mdBottomSheet,  $stateParams, $state, $mdDialog, LoginService,blockUI) {
        var restaurantId = $stateParams.restaurantId;

        $scope.restaurantId = restaurantId;

        $scope.showMobileMainHeader = true;

        $scope.upload = function($event) {
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
            LoginService.logout().$promise.then(function(){
                $state.go('login');
            }).finally(function(){
                blockUI.stop();
            });
        };

        $scope.showListBottomSheet = function ($event) {
            $mdBottomSheet.show({
                templateUrl: '/bottom-list-sheet.html',
                targetEvent: $event
            });
        };
    });


angular
    .module('guguorderapp')
    .controller('DishUploadDialogController', function ($scope,  $mdDialog, restaurantId) {
        console.log(restaurantId);


        $scope.dish = {};

        $scope.cancel = function() {
            $mdDialog.hide();
        };


        $scope.saveDish = function($event) {
            angular.forEach($scope.files,function(obj){
                if(!obj.isRemote){
                    formData.append('files[]', obj.lfFile);
                }
            });

        };
});
