'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('guguorderapp', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ngResource',
    'toaster'
  ])
  .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
   }])
  .config(['$httpProvider', function ($httpProvider) {
        // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        // // $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push('GuguInterceptor');
  }])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html'
          });

  }).run(function ($rootScope, $state, $location, LoginService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path() != '/login') {
            LoginService.isAuthenticated().$promise.then(function (data) {
                if (data.status != 'success') {
                    $state.go('login');
                }
            }, function (error) {
                $state.go('login');
            });
        }
    });
});
