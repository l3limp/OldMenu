define(["app"], function (oldMenu) {
  oldMenu.controller("homeController", [
    "$scope",
    "$location",
    "$http",
    "$anchorScroll",
    "itemService",
    "cartService",
    "filtersService",
    "brandService",
    "cacheService",
    "$log",
    "ItemServiceDB",
    "requestsService",
    function (
      $scope,
      $location,
      $http,
      $anchorScroll,
      itemService,
      cartService,
      filtersService,
      brandService,
      cacheService,
      $log,
      ItemServiceDB,
      requestsService
    ) {
      // $scope.types = ["Veg", "Non Veg"];
      $scope.sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

      $scope.currentbrand = brandService.currentbrand;

      $scope.brandsMap = {};
      $scope.cart = cartService.cart;
      $scope.showFilterModal = false;
      $scope.currentPage = 1;
      $scope.loadingState = true;
      $scope.brands = [];
      $scope.selectedCategories = filtersService.categories;
      $scope.selectedBrands = filtersService.brands;
      $scope.selectedSizes = filtersService.sizes;

      $scope.toggleFilterNew = function(toggleType, property) {

        filtersService.toggleFilterNew(toggleType, property);
        requestsService.getItems($scope.selectedBrands, $scope.selectedCategories, $scope.selectedSizes, "").then((items) => {
          $scope.$apply(function () {
            $scope.items = items;
          });
        });
      } 

      $scope.refreshItemsDOM = function () {
        $scope.brands.forEach(function (brand) {
          $scope.brandsMap[brand] = [];
        });

        $scope.items.forEach(function (item) {
          var brand = item.brand.name;
          $scope.brandsMap[brand].push(item);
        });
      };

      $scope.$on("cartUpdated", function () {
        $scope.cart = cartService.getCart();
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      $scope.loadData = async function () {
        try {
          const [
            brands,
            items,
            categories,
          ] = await Promise.all([
            requestsService.getBrands(),
            requestsService.getItems($scope.selectedBrands, $scope.selectedCategories, $scope.selectedSizes, ""),
            requestsService.getCategories()
          ]);

          $scope.$apply(function () {
            $scope.brands = brands;
            $scope.items = items;
            $scope.categories = categories;
          });

          itemService.items = items;

          $scope.loadingState = false;
        } catch (error) {
          console.error("Error:", error);
        }
        $scope.$apply("loadingState", function () {});
        $scope.loadingState = false;
      };

      $scope.searchQuery = "";
      $scope.loadSearchedItems = async function (searchQuery) {
        $scope.loadingState = true;
        if(searchQuery == null) {
          searchQuery = "";
        }
        try {
          const items = await requestsService.getItems($scope.selectedBrands, $scope.selectedCategories, $scope.selectedSizes, searchQuery);

          $scope.$apply(function () {
            $scope.items = items;
          });

          itemService.items = items;
        } catch (error) {
          console.error("Error:", error);
        }
        $scope.loadingState = false;

      };

      $scope.loadData();

      $scope.toggleFilterModalVisibility = function () {
        $scope.showFilterModal = !$scope.showFilterModal;
      };

      $scope.getDiscountPercentage = function (price, discountedPrice) {
        return Math.round((100 * (price - discountedPrice)) / price);
      };

      $scope.getCartQuantity = cartService.getCartQuantity;
      $scope.changeItemQuantityInCart = cartService.changeItemQuantityInCart;
      $scope.addItemToCart = cartService.addItemToCart;
      $scope.typeFilter = filtersService.typeFilter;
      $scope.categoryFilter = filtersService.categoryFilter;
      $scope.isFilterSelected = filtersService.isFilterSelected;
      $scope.toggleFilter = filtersService.toggleFilter;

      $scope.sortItemsPriceAscending = function () {
        $scope.items.sort((a, b) => a.discountedPrice - b.discountedPrice);
      };

      $scope.applyFilter = function () {
        $scope.loadSearchedItems($scope.searchQuery);
        $scope.toggleFilterModalVisibility();
      };
    },
  ]);
});
