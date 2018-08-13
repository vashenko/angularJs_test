'use strict';

angular.module('myApp.productBasket', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/productBasket', {
        templateUrl: 'productBasket/productBasket.html',
        controller: 'productBasket'
    });
}])

.controller('productBasket', [function() {

}]);