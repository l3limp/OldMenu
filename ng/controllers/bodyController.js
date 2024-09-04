define(["app",], function (oldMenu) {
  oldMenu.controller("bodyController", [
    "$scope",
    "$http",
    "cartService",
    "cacheService",
    "$q",
    "requestsService",
    function ($scope, $http, cartService, cacheService, $q, requestsService) {
      $scope.isCartOpen = false;
      $scope.cart = {};

      $scope.$on('cartUpdated', function() {
        $scope.cart = cartService.getCart();
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      cartFetch = function() {
        return $q(function(resolve, reject) {
          fetchCart($http).then(function(fetchedCart) {
            
            resolve(fetchedCart);
          }, reject);
        });
      };
  
      cartFetch().then(function(fetchedCart) {
            cartService.setCart(fetchedCart);
      });

      $scope.toggleCartVisibility = function () {
        $scope.isCartOpen = !$scope.isCartOpen;
      };

      $scope.getCartQuantity = cartService.getCartQuantity;
      $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
      $scope.getCartSubtotal = cartService.getCartSubtotal;
      $scope.getCartSubtotalWithoutDiscount =
        cartService.getCartSubtotalWithoutDiscount;
    },
  ]);
});
