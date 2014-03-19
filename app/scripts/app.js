'use strict';

angular.module('bookSaleApp', [
  'ngResource',
  'ngRoute',
  'mgcrea.ngStrap',
  'LocalStorageModule'
]).config(
    ['$routeProvider' , 'localStorageServiceProvider', function($routeProvider , localStorageService) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({  
        redirectTo: '/'
      });       
      localStorageService.setPrefix('bookSaleApp');
    }]);
