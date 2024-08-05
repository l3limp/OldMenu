oldMenu.controller("bodyController", [
    "$scope",
    "cartService",
    "cacheService",
    function ($scope, cartService, cacheService) {
      $scope.isCartOpen = false;
      $scope.cart = cartService.cart;

      $scope.$watch('cart', function(newValue) {
        cacheService.setData('cart', newValue);
      }, true);

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