'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
  .controller('DashboardCtrl', function($scope, $mdSidenav, $mdBottomSheet) {

    $scope.showMobileMainHeader = true;

    $scope.showListBottomSheet = function($event) {
      $mdBottomSheet.show({
        templateUrl: '/bottom-list-sheet.html',
        targetEvent: $event
      });
    };
  });
