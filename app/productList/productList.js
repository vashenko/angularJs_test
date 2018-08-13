'use strict';

angular.module('myApp.productList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/productList', {
        templateUrl: 'productList/productList.html',
        controller: 'productList'
    });
}])

.controller('productList', [function() {

}]);