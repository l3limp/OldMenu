define(["app"], function (oldMenu) {
  oldMenu.controller("itemDetailsController", [
    "$scope",
    "$routeParams",
    "$http",
    "itemDetailsService",
    "cartService",
    "cacheService",
    "requestsService",
    function (
      $scope,
      $routeParams,
      $http,
      itemDetailsService,
      cartService,
      cacheService,
      requestsService
    ) {
      $scope.itemId = $routeParams.itemId;
      $scope.imageInFocus = "";

      $scope.$on('cartUpdated', function() {
        $scope.cart = cartService.getCart();
      });

      requestsService.getItemById($scope.itemId).then((item) => {
        $scope.$apply(function () {
          $scope.item = item;
          $scope.imageInFocus = item.images[0];

        });
        itemDetailsService.item = item;
      });

      $scope.cart = cartService.getCart();

      $scope.changeImageInFocus = function(image) {
        $scope.imageInFocus = image;
      }

      $scope.getDiscountPercentage = function (price, discountedPrice) {
        return Math.round((100 * (price - discountedPrice)) / price);
      };

      $scope.getCartQuantity = cartService.getCartQuantity;
      $scope.addItemToCart = cartService.addItemToCart;
      $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
    },
  ]);
});
