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

      $scope.loadData = async function () {
        try {
          const response = await $http.get(
            "http://localhost:3000/items/" + $scope.itemId
          );
          const item = response.data;
          $scope.$apply(function () {
            $scope.item = item;
          });
          itemDetailsService.item = item;
          console.log($scope.item);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      $scope.loadData();
      $scope.cart = cartService.cart;
      $scope.$watch(
        "cart",
        function (newValue) {
          cacheService.setData("cart", newValue);
        },
        true
      );

      $scope.getDiscountPercentage = function (price, discountedPrice) {
        return Math.round((100 * (price - discountedPrice)) / price);
      };

      $scope.getCartQuantity = function (itemId) {
        if ($scope.cart[itemId] != null) {
          return $scope.cart[itemId].quantity;
        }
        return 0;
      };

      $scope.addItemToCart = function (item) {
        $scope.cart[item.id] = item;
        $scope.cart[item.id].quantity = 1;
        cartService.cart = $scope.cart;
      };

      $scope.changeItemQuantityInCart = function (action, itemId) {
        $scope.cart[itemId].quantity += action;
        if ($scope.cart[itemId].quantity === 0) {
          delete $scope.cart[itemId];
        }
        cartService.cart = $scope.cart;
      };
    },
  ]);
});
