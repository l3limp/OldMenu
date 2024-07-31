oldMenu.controller("bodyController", [
  "$scope",
  "cartService",
  function ($scope, cartService) {
    $scope.isCartOpen = false;
    $scope.toggleCartVisibility = function () {
      $scope.cart = cartService.cart;
      $scope.isCartOpen = !$scope.isCartOpen;

      $scope.getCartQuantity = function (itemID) {
        if ($scope.cart[itemID] != null) {
          return $scope.cart[itemID].quantity;
        }
        return 0;
      };

      $scope.changeItemQuantityInCart = function (action, itemID) {
        $scope.cart[itemID].quantity += action;
        if ($scope.cart[itemID].quantity === 0) {
          delete $scope.cart[itemID];
        }
        cartService.cart = $scope.cart;
      };

      $scope.getCartSubtotal = function () {
        var subtotal = 0;

        for (key in $scope.cart) {
          subtotal +=
            $scope.cart[key].quantity * $scope.cart[key].discountedPrice;
        }
        return subtotal;
      };

      $scope.getCartSubtotalWithoutDiscount = function () {
        var subtotalWithoutDiscount = 0;

        for (key in $scope.cart) {
          subtotalWithoutDiscount +=
            $scope.cart[key].quantity * $scope.cart[key].price;
        }
        return subtotalWithoutDiscount;
      };
    };
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

    $scope.getDiscountPercentage = function (price, discountedPrice) {
      return Math.round((100 * (price - discountedPrice)) / price);
    };

    $scope.changeCategory = function (newCategory) {
      $scope.currentCategory = newCategory;
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

    $scope.typeFilter = filtersService.typeFilter;
    $scope.cuisineFilter = filtersService.cuisineFilter;

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

    $scope.isFilterSelected = function (filterType, property) {
      switch (filterType) {
        case "type":
          if ($scope.typeFilter[property] === true) {
            return true;
          }
          break;
        case "cuisine":
          if ($scope.cuisineFilter[property] === true) {
            return true;
          }
          break;
        default:
          break;
      }
      return false;
    };

    $scope.toggleFilter = function (filterType, property) {
      switch (filterType) {
        case "type":
          if ($scope.typeFilter[property] === true) {
            delete $scope.typeFilter[property];
          } else {
            $scope.typeFilter[property] = true;
          }
          filtersService.typeFilter = $scope.typeFilter;
          break;
        case "cuisine":
          if ($scope.cuisineFilter[property] === true) {
            delete $scope.cuisineFilter[property];
          } else {
            $scope.cuisineFilter[property] = true;
          }
          filtersService.cuisineFilter = $scope.cuisineFilter;
          break;
        default:
          break;
      }
    };

    $scope.toggleFilterModalVisibility = function () {
      $scope.showFilterModal = !$scope.showFilterModal;
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
