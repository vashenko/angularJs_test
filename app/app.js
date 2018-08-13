'use strict';

'use strict';

(function(){

    var app = angular.module('myApp', ['ngCookies', 'ngRoute', 'myApp.productList', 'myApp.productBasket'])
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.otherwise({redirectTo: '/productList'});
        }]);

    app.directive('storeNavbar', function () {
        return {
            templateUrl: 'storeNavbar/storeNavbar.html'
        }
    });

    app.controller('StoreController', ['$scope','$cookies', function($scope,$cookies){

        $scope.products = productsData;
        $scope.cart = [];
        $scope.total = 0;

        if(!angular.isUndefined($cookies.get('total'))){
            $scope.total = parseFloat($cookies.get('total'));
        }

        if (!angular.isUndefined($cookies.get('cart'))) {
            $scope.cart =  $cookies.getObject('cart');
        }

        $scope.addItemToCart = function(product){

            if ($scope.cart.length === 0){
                product.count = 1;
                $scope.cart.push(product);
            } else {
                var repeat = false;
                for(var i = 0; i< $scope.cart.length; i++){
                    if($scope.cart[i].id === product.id){
                        repeat = true;
                        $scope.cart[i].count +=1;
                    }
                }
                if (!repeat) {
                    product.count = 1;
                    $scope.cart.push(product);
                }
            }
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.putObject('cart', $scope.cart,  {'expires': expireDate});
            $scope.cart = $cookies.getObject('cart');

            $scope.total += parseFloat(product.price);
            $cookies.put('total', $scope.total,  {'expires': expireDate});
        };

        $scope.removeItemCart = function(product){

            if(product.count > 1){
                product.count -= 1;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
                $scope.cart = $cookies.getObject('cart');
            }
            else if(product.count === 1){
                var index = $scope.cart.indexOf(product);
                $scope.cart.splice(index, 1);
                expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
                $scope.cart = $cookies.getObject('cart');

            }

            $scope.total -= parseFloat(product.price);
            $cookies.put('total', $scope.total,  {'expires': expireDate});

        };

    }]);

    var productsData = [{
        id: 1,
        name: 'Asus',
        price: 100.0,
        image: ''
    },{
        id: 2,
        name: 'Mac',
        price: 14.5,
        image: ''
    },{
        id: 3,
        name: 'Lenovo',
        price: 100.43,
        image: ''
    },{
        id: 4,
        name: 'Acer',
        price: 99.9,
        image: ''
    }];

})();
