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
      $log
    ) {
      $scope.types = ["Veg", "Non Veg", "Contains Egg"];

      // known bug: clicking on one category redirects you to that, but doesnt show on the categories list until clicked again, I do not know the cause
      $scope.currentCategory = categoryService.currentCategory;

      $scope.categoriesMap = {};
      $scope.cart = cartService.cart;
      $scope.showFilterModal = false;

      $scope.$watch(
        "cart",
        function (newValue) {
          cacheService.setData("cart", newValue);
        },
        true
      );

      $scope.refreshItemsDOM = function() {
        $scope.categories.forEach(function (category) {
          $scope.categoriesMap[category] = [];
        });

        $scope.items.forEach(function (item) {
          var category = item.category;
          $scope.categoriesMap[category].push(item);
        });
      };

      $scope.loadData = async function () {
        try {
          const [itemsResponse, categoriesResponse, cuisineResponse] =
            await Promise.all([
              $http.get("http://localhost:8080/freshmenu/items", {params: {query:"paneer"}}),
              $http.get("http://localhost:8080/freshmenu/categories"),
              $http.get("http://localhost:8080/freshmenu/cuisines"),
            ]);

          const items = itemsResponse.data;
          const categories = categoriesResponse.data;
          const cuisines = cuisineResponse.data;

          $log.log(items);
          $log.log(categories);
          $log.log(cuisines);

          $scope.$apply(function () {
            $scope.items = items;
            $scope.categories = categories;
            $scope.cuisines = cuisines;

            $scope.refreshItemsDOM();
          });

          itemService.items = items;
        } catch (error) {
          console.error("Error:", error);
        }
      };

      $scope.searchQuery = "";
      $scope.loadSearchedItems = async function (searchQuery) {
        if (searchQuery == "") {
          $scope.searchQuery = "";
          searchQuery = "paneer";
        }
        try {

          var cuisinesChosen = "";
          var typesChosen = "";

          for(const type in $scope.typeFilter) {
            typesChosen+=type +',';
          }

          for(const cuisine in $scope.cuisineFilter) {
            cuisinesChosen+=cuisine +',';
          }

          if(cuisinesChosen!="") {
            cuisinesChosen = cuisinesChosen.slice(0, -1);
          }
          if(typesChosen!="") {
            typesChosen = typesChosen.slice(0, -1);
          }

          var config = {
            params: {
              query: searchQuery,
              type: typesChosen,
              cuisineNames: cuisinesChosen
            },
          };
          const itemsResponse = await $http.get(
            "http://localhost:3000/items",
            config
          );

          const items = itemsResponse.data.items;

          $log.log(items);

          $scope.$apply(function () {
            $scope.items = items;
            $scope.refreshItemsDOM();

          });

          itemService.items = items;
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

      var scrollTo = function (elementId) {
        //some bug
        $location.hash(elementId);
        $anchorScroll();
      };

      $scope.changeCategory = function (newCategory) {
        categoryService.currentCategory = newCategory;
        scrollTo(newCategory);
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
        for (category in $scope.categoriesMap) {
          $scope.categoriesMap[category].sort(
            (a, b) => a.discountedPrice - b.discountedPrice
          );
        }
      };

      $scope.applyFilter = function() {
      $scope.loadSearchedItems($scope.searchQuery);
      $scope.toggleFilterModalVisibility();
      };

      $scope.applyVegFilter = function() {
        $scope.toggleFilter('type','Veg');
        $scope.loadSearchedItems('paneer');
      }
    },
  ]);
});
