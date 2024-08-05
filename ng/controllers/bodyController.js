oldMenu.controller("bodyController", [
    "$scope",
    "cartService",
    function ($scope, cartService) {
      $scope.isCartOpen = false;
  
      $scope.toggleCartVisibility = function () {
        $scope.cart = cartService.cart;
        $scope.isCartOpen = !$scope.isCartOpen;
      };
  
      $scope.getCartQuantity = cartService.getCartQuantity;
      $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
      $scope.getCartSubtotal = cartService.getCartSubtotal;
      $scope.getCartSubtotalWithoutDiscount =
        cartService.getCartSubtotalWithoutDiscount;
    },
  ]);