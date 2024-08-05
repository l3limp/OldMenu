oldMenu.controller("ModalController", [
  "$scope",
  "$uibModal",
  "cartService",
  function ($scope, $uibModal, cartService) {
    $scope.openModal = function () {
      var modalInstance = $uibModal.open({
        templateUrl: "checkoutModal.htm",
        controller: "ModalInstanceController",
        size: "lg",
        resolve: {
          cartService: cartService,
        },
      });

      modalInstance.result.then(
        function (selectedItem) {
          $scope.selected = selectedItem;
        },
        function () {
          console.log("Modal dismissed");
        }
      );
    };
  },
]);

oldMenu.controller("ModalInstanceController", [
  "$scope",
  "$uibModalInstance",
  "cartService",
  function ($scope, $uibModalInstance, cartService) {
    $scope.cart = cartService.cart;

    $scope.getCartSubtotal = cartService.getCartSubtotal;
    console.log($scope.getCartSubtotal);

    $scope.ok = function () {
      $uibModalInstance.close("Some result");
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  },
]);
