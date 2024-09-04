define(["app"], function (oldMenu) {
  oldMenu.service("itemService",  [
    function () {
      this.items = [];
      this.brandWiseItems = {};
    },
  ]);

  // take this back to itemdetailscontroller when integrating with backend/db
  // plan is to call an api to get description, ingredients and nutrition
  oldMenu.service("itemDetailsService", [
    function () {
      this.item = {};
    },
  ]);

  oldMenu.service("cartService",[
    "cacheService",
    "$http",
    "$rootScope",

    function (cacheService, $http, $rootScope) {
      this.cart = {};

      this.setCart = function(newCart) {
        this.cart = angular.copy(newCart);
        $rootScope.$broadcast('cartUpdated');
      };

      this.getCart = function() {
        return this.cart;
      }

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
        $rootScope.$broadcast('cartUpdated');

        var body = {};
        body.action = action;
        body.itemId = itemId;
        console.log("remaining quantity: ", this.cart[itemId].quantity);
        if (this.cart[itemId].quantity <= 0) {
          body = {};
          body.itemId = itemId;
          deleteFromCart($http, body);
          delete this.cart[itemId];
        } else {
          updateCart($http, body);
        }
        $rootScope.$broadcast('cartUpdated');

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
        addItemToBackendCart($http, {itemId: item.id});
        $rootScope.$broadcast('cartUpdated');

      };
      
      this.placeOrder = function() {
        if(this.cart == null) return null;
        orderItems = [];
        for(var key in this.cart) {
        orderItem = {};
          orderItem.itemId = this.cart[key].id;
          orderItem.quantity = this.cart[key].quantity;
          orderItems.push(orderItem);
        }
        placeOrder($http, {orderItems:orderItems});
        this.cart = {};
        $rootScope.$broadcast('cartUpdated');
      }

    },
  ]);

  oldMenu.service("filtersService", [
    function () {
      this.typeFilter = {};
      this.categoryFilter = {};

      this.brands = [];
      this.categories = [];
      this.sizes = [];

      this.toggleFilterNew = function(toggleType, property) {
        var index = -1;
        switch (toggleType) {
          case "brand":
             index = this.brands.indexOf(property);
            if (index > -1) {
              this.brands.splice(index, 1);
            } else {
              this.brands.push(property);
            }
            break;

            case "category":
             index = this.categories.indexOf(property);
            if (index > -1) {
              this.categories.splice(index, 1);
            } else {
              this.categories.push(property);
            }
            break;

            case "size":
             index = this.sizes.indexOf(property);
            if (index > -1) {
              this.sizes.splice(index, 1);
            } else {
              this.sizes.push(property);
            }
            break;
          default:
            break;
        }
        console.log("in service",this.sizes);

      }

      // this.isFilterSelected = function (filterType, property) {
      //   switch (filterType) {
      //     case "type":
      //       if (this.typeFilter[property] === true) {
      //         return true;
      //       }
      //       break;
      //     case "category":
      //       if (this.categoryFilter[property] === true) {
      //         return true;
      //       }
      //       break;
      //       case "size":
      //       if (this.sizes.contains(property)) {
      //         return true;
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      //   return false;
      // };

      // this.toggleFilter = function (filterType, property) {
      //   switch (filterType) {
      //     case "type":
      //       if (this.typeFilter[property] === true) {
      //         delete this.typeFilter[property];
      //       } else {
      //         this.typeFilter[property] = true;
      //       }
      //       break;
      //     case "category":
      //       if (this.categoryFilter[property] === true) {
      //         delete this.categoryFilter[property];
      //       } else {
      //         this.categoryFilter[property] = true;
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      // };
    },
  ]);

  // had to make this service as the url kept changing on selecting a brand, which reinitialised the controller and thus, currentbrand to 'bowl'
  oldMenu.service("brandService", [
    function () {
      this.currentbrand = "Bowls";
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
