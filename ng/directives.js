define(["app"], function (oldMenu) {
  oldMenu.directive("cartSidebar", function () {
    return {
      templateUrl: "directives/cartSidebar.htm",
      replace: true,
      scope: {
        isCartOpen: "=",
        cart: "=",
        toggleCartVisibility: "&",
        changeItemQuantityInCart: "&",
        getCartQuantity: "&",
        getCartSubtotal: "&",
        getCartSubtotalWithoutDiscout: "&",
      },
    };
  });

  oldMenu.directive("filtersModal", function () {
    return {
      templateUrl: "directives/filtersModal.htm",
      replace: true,
      scope: {
        sizes: "=",
        categories: "=",
        showFilterModal: "=",
        toggleFilterNew: "&",
        isFilterSelected: "&",
        toggleFilterModalVisibility: "&",
        selectedSizes:'=',
      },
    };
  });

  oldMenu.directive("itemCard", function () {
    return {
      templateUrl: "directives/itemCard.htm",
      replace: true,
      scope: {
        item: "=",
        getDiscountPercentage: "&",
        getCartQuantity: "&",
        addItemToCart: "&",
        changeItemQuantityInCart: "&",
      },
    };
  });

  oldMenu.directive("cartItemCard", function () {
    return {
      templateUrl: "directives/cartItemCard.htm",
      replace: true,
      scope: {
        item: "=",
        getCartQuantity: "&",
        changeItemQuantityInCart: "&",
      },
    };
  });

  oldMenu.directive("brandsColumn", function () {
    return {
      templateUrl: "directives/brandsColumn.htm",
      replace: true,
      scope: {
        brands: "=",
        toggleFilterNew: "&",
        selectedBrands: "=",
      },
    };
  });

  oldMenu.directive("categoriesColumn", function () {
    return {
      templateUrl: "directives/categoriesColumn.htm",
      replace: true,
      scope: {
        categories: "=",
        toggleFilterNew: "&",
        selectedCategories: "=",
      },
    };
  });

  oldMenu.directive("filterSection", function () {
    return {
      templateUrl: "directives/filterSection.htm",
      replace: true,
      scope: {
        list: "=",
        selectedList:'=',
        title: "@",
        filterSectionType: "@",
        toggleFilterNew: "&",
        isFilterSelected: "&",
      },
    };
  });

  oldMenu.directive("homeNavbar", function () {
    return {
      templateUrl: "directives/homeNavbar.htm",
      replace: true,
      scope: {
        sizes: "=",
        categories: "=",
        showFilterModal: "=",
        toggleFilterNew: "&",
        isFilterSelected: "&",
        toggleFilterModalVisibility: "&",
        sortItemsPriceAscending: "&",
        loadSearchedItems: "&",
        searchQuery: "=",
        applyFilter: "&",
        searchResults:'=',
        selectedSizes:'=',
        sizes:'='
      },
    };
  });

  oldMenu.directive("navbar", function () {
    return {
      templateUrl: "directives/navbar.htm",
      replace: true,
      scope: {
        toggleCartVisibility: "&",
      },
    };
  });
});
