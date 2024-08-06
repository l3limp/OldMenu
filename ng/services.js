define(["app"], function (oldMenu) {
  oldMenu.service("itemService", [
    function () {
      this.items = [];
    },
  ]);

  // take this back to itemdetailscontroller when integrating with backend/db
  // plan is to call an api to get description, ingredients and nutrition
  oldMenu.service("itemDetailsService", [
    function () {
      this.item = {};
    },
  ]);

  oldMenu.service("cartService", [
    "cacheService",

    function (cacheService) {
      this.cart = cacheService.getData("cart") || {};

      this.getCartSubtotal = function () {
        var subtotal = 0;

        for (key in this.cart) {
          subtotal += this.cart[key].quantity * this.cart[key].discountedPrice;
        }
        return subtotal;
      };

      this.getCartSubtotalWithoutDiscount = function () {
        var subtotalWithoutDiscount = 0;

        for (key in this.cart) {
          subtotalWithoutDiscount +=
            this.cart[key].quantity * this.cart[key].price;
        }
        return subtotalWithoutDiscount;
      };

      this.changeItemQuantityInCart = function (action, itemId) {
        this.cart[itemId].quantity += action;
        if (this.cart[itemId].quantity === 0) {
          delete this.cart[itemId];
        }
      };

      this.getCartQuantity = function (itemId) {
        if (this.cart[itemId] != null) {
          return this.cart[itemId].quantity;
        }
        return 0;
      };

      this.addItemToCart = function (item) {
        this.cart[item.id] = item;
        this.cart[item.id].quantity = 1;
      };
    },
  ]);

  oldMenu.service("filtersService", [
    function () {
      this.typeFilter = {};
      this.cuisineFilter = {};

      this.isFilterSelected = function (filterType, property) {
        switch (filterType) {
          case "type":
            if (this.typeFilter[property] === true) {
              return true;
            }
            break;
          case "cuisine":
            if (this.cuisineFilter[property] === true) {
              return true;
            }
            break;
          default:
            break;
        }
        return false;
      };

      this.toggleFilter = function (filterType, property) {
        switch (filterType) {
          case "type":
            if (this.typeFilter[property] === true) {
              delete this.typeFilter[property];
            } else {
              this.typeFilter[property] = true;
            }
            break;
          case "cuisine":
            if (this.cuisineFilter[property] === true) {
              delete this.cuisineFilter[property];
            } else {
              this.cuisineFilter[property] = true;
            }
            break;
          default:
            break;
        }
      };
    },
  ]);

  // had to make this service as the url kept changing on selecting a category, which reinitialised the controller and thus, currentCategory to 'bowl'
  oldMenu.service("categoryService", [
    function () {
      this.currentCategory = "Bowls";
    },
  ]);

  oldMenu.service("cacheService", [
    "$window",
    function ($window) {
      return {
        setData: function (key, data) {
          $window.localStorage.setItem(key, angular.toJson(data));
        },
        getData: function (key) {
          return angular.fromJson($window.localStorage.getItem(key));
        },
        removeData: function (key) {
          $window.localStorage.removeItem(key);
        },
      };
    },
  ]);
});
