define(["app"], function (oldMenu) {
  oldMenu.controller("itemDetailsController", [
    "$scope",
    "$routeParams",
    "$http",
    "itemDetailsService",
    "cartService",
    "cacheService",
    function (
      $scope,
      $routeParams,
      $http,
      itemDetailsService,
      cartService,
      cacheService
    ) {
      $scope.itemId = $routeParams.itemId;

      $scope.$on('cartUpdated', function() {
        $scope.cart = cartService.getCart();
      });

      $scope.loadData = async function () {
        try {
          const item = await fetchItemDetails($http, {
            itemId: $scope.itemId,
          });
          $scope.$apply(function () {
            $scope.item = item;
          });
          itemDetailsService.item = item;
          console.log(item)
        } catch (error) {
        }
      };

      $scope.loadData();
      $scope.cart = cartService.getCart();

      $scope.getDiscountPercentage = function (price, discountedPrice) {
        return Math.round((100 * (price - discountedPrice)) / price);
      };

      $scope.getCartQuantity = cartService.getCartQuantity;
      $scope.addItemToCart = cartService.addItemToCart;
      $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
    },
  ]);
});
