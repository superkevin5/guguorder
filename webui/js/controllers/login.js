'use strict';

/**
 * @ngdoc function
 * @name guguorderapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of guguorderapp
 */
angular.module('guguorderapp')
  .controller('LoginCtrl', function($scope, $location, $state, LoginService,guguConstant,toaster) {
    $scope.submit = function() {
        LoginService.login({email: $scope.username, token: $scope.password}).$promise.then(function(data){
            if(data) {
                if(data.id){
                    $state.go('dashboard');
                } else {
                    toaster.pop('error', data.message);
                }

            } else {
                toaster.pop('error', "Invalid username or password");
            }
        });
    }

  });
