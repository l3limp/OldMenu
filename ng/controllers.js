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

oldMenu.controller("homeController", [
  "$scope",
  "itemService",
  "cartService",
  "filtersService",
  function ($scope, itemService, cartService, filtersService) {
    $scope.items = itemService.itemsList;
    $scope.categories = ["Bowl", "Super Bowl", "Omelette"];
    $scope.cuisines = ["Universal", "Continental", "Mexican", "Fusion"];
    $scope.types = ["veg", "nonveg"];
    // known bug: clicking on one category redirects you to that, but doesnt show on the categories list until clicked again, I do not know the cause
    $scope.currentCategory = "Bowl";
    $scope.categoriesMap = {};
    $scope.cart = cartService.cart;
    $scope.showFilterModal = false;

    $scope.categories.forEach(function (category) {
      $scope.categoriesMap[category] = [];
    });

    $scope.items.forEach(function (item) {
      var category = item.category;
      $scope.categoriesMap[category].push(item);
    });

    $scope.toggleFilterModalVisibility = function () {
      $scope.showFilterModal = !$scope.showFilterModal;
    };

    $scope.getDiscountPercentage = function (price, discountedPrice) {
      return Math.round((100 * (price - discountedPrice)) / price);
    };

    $scope.changeCategory = function (newCategory) {
      $scope.currentCategory = newCategory;
    };

    $scope.getCartQuantity = cartService.getCartQuantity;
    $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
    $scope.addItemToCart = cartService.addItemToCart;
    $scope.typeFilter = filtersService.typeFilter;
    $scope.cuisineFilter = filtersService.cuisineFilter;
    $scope.isFilterSelected = filtersService.isFilterSelected;
    $scope.toggleFilter = filtersService.toggleFilter;

    $scope.isDishToBeShown = function (type, cuisine) {
      var isTypeValid = false;
      var isCuisineValid = false;

      if ($scope.typeFilter[type] === true) {
        isTypeValid = true;
      }
      if ($scope.cuisineFilter[cuisine] === true) {
        isCuisineValid = true;
      }

      if (Object.keys($scope.typeFilter).length === 0) {
        isTypeValid = true;
      }
      if (Object.keys($scope.cuisineFilter).length === 0) {
        isCuisineValid = true;
      }

      return isTypeValid && isCuisineValid;
    };
  },
]);

oldMenu.controller("itemDetailsController", [
  "$scope",
  "$routeParams",
  "itemDetailsService",
  "cartService",
  function ($scope, $routeParams, itemDetailsService, cartService) {
    $scope.item = itemDetailsService.item;
    $scope.itemID = $routeParams.itemID;
    $scope.cart = cartService.cart;

    $scope.getDiscountPercentage = function (price, discountedPrice) {
      return Math.round((100 * (price - discountedPrice)) / price);
    };

    $scope.getCartQuantity = function (itemID) {
      if ($scope.cart[itemID] != null) {
        return $scope.cart[itemID].quantity;
      }
      return 0;
    };

    $scope.addItemToCart = function (item) {
      $scope.cart[item.id] = item;
      $scope.cart[item.id].quantity = 1;
      cartService.cart = $scope.cart;
    };

    $scope.changeItemQuantityInCart = function (action, itemID) {
      $scope.cart[itemID].quantity += action;
      if ($scope.cart[itemID].quantity === 0) {
        delete $scope.cart[itemID];
      }
      cartService.cart = $scope.cart;
    };
  },
]);

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
