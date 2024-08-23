define(["app"], function (oldMenu) {
  oldMenu.controller("homeController", [
    "$scope",
    "$location",
    "$http",
    "$anchorScroll",
    "itemService",
    "cartService",
    "filtersService",
    "categoryService",
    "cacheService",
    "$log",
    "ItemServiceDB",
    function (
      $scope,
      $location,
      $http,
      $anchorScroll,
      itemService,
      cartService,
      filtersService,
      categoryService,
      cacheService,
      $log,
      ItemServiceDB
    ) {
      $scope.types = ["Veg", "Non Veg"];

      $scope.currentCategory = categoryService.currentCategory;

      $scope.categoriesMap = {};
      $scope.cart = cartService.cart;
      $scope.showFilterModal = false;
      $scope.currentPage = 1;
      $scope.loadingState = true;
      $scope.searchResults = [];

      $scope.$watch(
        function () {
          return $scope.searchQuery;
        },
        function (query) {
            searchES($http, query).then((res) => {
              $scope.searchResults = res;
              $scope.$apply();
            });
          
          
        },
        true
      );

      

      $scope.refreshItemsDOM = function () {
        $scope.categories.forEach(function (category) {
          $scope.categoriesMap[category] = [];
        });

        $scope.items.forEach(function (item) {
          var category = item.category.name;
          $scope.categoriesMap[category].push(item);
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
          const [items, categories, cuisines] = await Promise.all([
            ItemServiceDB.getItems({
              searchFilters: { category: $scope.currentCategory },
            }),
            fetchCategories($http),
            fetchCuisines($http),
          ]);

          // const temp =await ItemServiceDB.getItems();
          // $log.log(temp);

          $scope.$apply(function () {
            $scope.items = items;
            $scope.categories = categories;
            $scope.cuisines = cuisines;
          });

          itemService.items = items;
          itemService.categoryWiseItems["Bowls"] = items;

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
        if (searchQuery == null) {
          searchQuery = $scope.searchQuery;
        } else if (searchQuery == "") {
          $scope.searchQuery = "";
        } else {
          $scope.currentPage = 1;
        }
        try {
          var cuisinesChosen = "";
          var typesChosen = "";

          for (const type in $scope.typeFilter) {
            typesChosen += type + ",";
          }

          for (const cuisine in $scope.cuisineFilter) {
            cuisinesChosen += cuisine + ",";
          }

          if (cuisinesChosen != "") {
            cuisinesChosen = cuisinesChosen.slice(0, -1);
          }
          if (typesChosen != "") {
            typesChosen = typesChosen.slice(0, -1);
          }

          const items = await fetchItems($http, {
            query: searchQuery,
            cuisines: cuisinesChosen,
            categories: $scope.currentCategory,
            pageNum: $scope.currentPage - 1,
          });

          if ($scope.currentPage === 1) {
            itemService.categoryWiseItems[$scope.currentCategory] = items;
          }

          $scope.$apply(function () {
            $scope.items = items;
          });

          $scope.loadingState = false;
          itemService.items = items;
          $scope.$apply("loadingState", function () {});
        } catch (error) {
          console.error("Error:", error);
        }
      };

      $scope.loadData();

      $scope.toggleFilterModalVisibility = function () {
        $scope.showFilterModal = !$scope.showFilterModal;
      };

      $scope.getDiscountPercentage = function (price, discountedPrice) {
        return Math.round((100 * (price - discountedPrice)) / price);
      };

      $scope.changeCategory = function (newCategory) {
        $scope.currentPage = 1;
        categoryService.currentCategory = newCategory;
        $scope.currentCategory = newCategory;

        if (
          itemService.categoryWiseItems[$scope.currentCategory] != null &&
          itemService.categoryWiseItems[$scope.currentCategory].length === 10
        ) {
          $scope.items = itemService.categoryWiseItems[$scope.currentCategory];
        } else {
          $scope.loadSearchedItems();
        }
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

      $scope.sortItemsPriceAscending = function () {
        $scope.items.sort((a, b) => a.discountedPrice - b.discountedPrice);
      };

      $scope.applyFilter = function () {
        $scope.loadSearchedItems();
        $scope.toggleFilterModalVisibility();
      };

      $scope.applyVegFilter = function () {
        $scope.toggleFilter("type", "Veg");
        $scope.loadSearchedItems();
      };

      $scope.changePage = function (action) {
        if (
          (action == -1 && $scope.currentPage == 1) ||
          (action == 1 && $scope.items.length < 10)
        ) {
        } else {
          $scope.currentPage += action;
          $scope.loadSearchedItems();
        }
      };
    },
  ]);
});
