'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
  .controller('DashboardCtrl', function($scope, $state, LoginService) {


      LoginService.isAuthenticated().$promise.then(function(data) {

          console.log(data);



      });




  });
