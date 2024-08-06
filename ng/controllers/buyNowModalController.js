define(["app"], function (oldMenu) {
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
});
