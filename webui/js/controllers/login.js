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
        console.log('aaaaaaaaa');

        // LoginService.login({email: $scope.username, token: $scope.password}).$promise.then(function(data){
        //     console.log('wwwwwwww');
        //     if(data) {
        //         if(data.restaurantID){
        //             $state.go('dashboard');
        //         } else {
        //             toaster.pop('error', data);
        //         }
        //
        //     } else {
        //         toaster.pop('error', "Invalid username or password");
        //     }
        // });
        LoginService.testlogin().$promise.then(function(d){
            console.log(d);

        });


    }

  });
