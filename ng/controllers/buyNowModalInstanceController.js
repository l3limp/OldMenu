define(["app"], function (oldMenu) {
  oldMenu.controller("ModalInstanceController", [
    "$scope",
    "$uibModalInstance",
    "cartService",
    function ($scope, $uibModalInstance, cartService) {
      $scope.cart = cartService.cart;

      $scope.getCartSubtotal = cartService.getCartSubtotal;
      $scope.placeOrder = cartService.placeOrder;

      $scope.ok = async function () {
        await $scope.placeOrder();
        cartService.cart = {};
        $uibModalInstance.close("Some result");
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    },
  ]);
});
