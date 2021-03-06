/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController',
            controllerAs: 'MainCtrl'
        })

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController',
            controllerAs: 'AdminCtrl'
        })

        .when('/stores', {
            templateUrl: 'views/store.html',
            controller: 'StoreController',
            controllerAs: 'StoreCtrl'
        })

        .when('/sales', {
            templateUrl: 'views/sale.html',
            controller: 'SaleController',
            controllerAs: 'SaleCtrl'
        })
    ;

    $locationProvider.html5Mode(true);

}]);

