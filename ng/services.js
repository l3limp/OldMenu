oldMenu.service("itemService", [
  function () {
    this.items = [
      
    ];
  },
]);

// take this back to itemdetailscontroller when integrating with backend/db
// plan is to call an api to get description, ingredients and nutrition
oldMenu.service("itemDetailsService", [
  function () {
    this.item = {};
    // this.item = {
    //   id: 1,
    //   name: "Fresh Fruit Bowl",
    //   price: 249,
    //   discountedPrice: 129,
    //   cuisine: "Universal",
    //   category: "Bowl",
    //   image: "images/temp.JPG",
    //   type: "Veg",
    //   description:
    //     "A mix of bite sized pineapple, watermelon, muskmelon, papaya, apple, pomegranate; perfect to brighten up your day in the morning and fuel you up for the rest of the day.",
    //   ingredients:
    //     "Watermelon, Apple, Muskmelon, Pineapple, Papaya, Pomegranate, Honey, Mint leaf",
    //   nutrition: {},
    // };
  },
]);

oldMenu.service("cartService", [
  function () {
    this.cart = {};

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
oldMenu.service('categoryService', [function() {
  this.currentCategory = "Bowl";
}]);