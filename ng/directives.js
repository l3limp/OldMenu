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
        types: "=",
        cuisines: "=",
        showFilterModal: "=",
        toggleFilter: "&",
        isFilterSelected: "&",
        toggleFilterModalVisibility: "&",
      },
    };
  });

  oldMenu.directive("itemCard", function () {
    return {
      templateUrl: "directives/itemCard.htm",
      replace: true,
      scope: {
        item: "=",
        isDishToBeShown: "&",
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

  oldMenu.directive("categoriesColumn", function () {
    return {
      templateUrl: "directives/categoriesColumn.htm",
      replace: true,
      scope: {
        currentCategory: "=",
        categories: "=",
        changeCategory: "&",
      },
    };
  });

  oldMenu.directive("filterSection", function () {
    return {
      templateUrl: "directives/filterSection.htm",
      replace: true,
      scope: {
        list: "=",
        title: "@",
        filterSectionType: "@",
        toggleFilter: "&",
        isFilterSelected: "&",
      },
    };
  });

  oldMenu.directive("homeNavbar", function () {
    return {
      templateUrl: "directives/homeNavbar.htm",
      replace: true,
      scope: {
        types: "=",
        cuisines: "=",
        showFilterModal: "=",
        toggleFilter: "&",
        isFilterSelected: "&",
        toggleFilterModalVisibility: "&",
        sortItemsPriceAscending: "&",
        loadSearchedItems: "&",
        searchQuery: "=",
        applyFilter: "&",
        applyVegFilter:'&',
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
