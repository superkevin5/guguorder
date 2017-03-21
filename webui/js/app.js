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
      'ngResource',
      'toaster',
      'ngMaterial',
      'lfNgMdFileInput',
      'blockUI'
  ])
  .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
   }])
  .config(function($mdThemingProvider,guguConstant) {
      $mdThemingProvider
          .definePalette('customPrimary',
              guguConstant.CUSTOMPRIMARY);
      $mdThemingProvider
          .definePalette('customAccent',
              guguConstant.CUSTOMACCENT);
      $mdThemingProvider
          .definePalette('customWarn',
              guguConstant.CUSTOMWARN);
      $mdThemingProvider
          .definePalette('customBackground',
              guguConstant.CUSTOMBACKGROUND);
      $mdThemingProvider.theme('default');
          // .primaryPalette('customPrimary')
          // .accentPalette('customAccent')
          // .warnPalette('customWarn');
    })
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
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard/:restaurantId',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm',
            css: 'css/agency.css'
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
        if ($location.path() != '/login' && $location.path() != '/register') {
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
