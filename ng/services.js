oldMenu.service('itemService', [function(){
    this.itemsList = [
        {
          id: 1,
          name: "Fresh Fruit Bowl",
          price: 249,
          discountedPrice: 129,
          cuisine: "Universal",
          category: "Bowl",
          image: "images/temp.JPG",
          type: "veg",
        },
        {
          id: 2,
          name: "Meatball Stroganoff Rice Bowl",
          price: 299,
          discountedPrice: 129,
          cuisine: "Continental",
          category: "Bowl",
          image: "images/temp.JPG",
          type: "nonveg",
        },
        {
          id: 3,
          name: "Chargrilled Moroccan Cottage Cheese Superbowl",
          price: 339,
          discountedPrice: 129,
          cuisine: "Mexican",
          category: "Super Bowl",
          image: "images/temp.JPG",
          type: "veg",
        },
        {
          id: 4,
          name: "Roast Chicken Russian Omelette",
          price: 249,
          discountedPrice: 129,
          cuisine: "Universal",
          category: "Omelette",
          image: "images/temp.JPG",
          type: "nonveg",
        },
        {
          id: 5,
          name: "Masala Omelette",
          price: 79,
          discountedPrice: 79,
          cuisine: "Fusion",
          category: "Omelette",
          image: "images/temp.JPG",
          type: "nonveg",
        },
      ];
}]);

// take this back to itemdetailscontroller when integrating with backend/db
// plan is to call an api to get description, ingredients and nutrition
oldMenu.service('itemDetailsService', [function(){
    this.item =
        {
          id: 1,
          name: "Fresh Fruit Bowl",
          price: 249,
          discountedPrice: 129,
          cuisine: "Universal",
          category: "Bowl",
          image: "images/temp.JPG",
          type: "veg",
          description:
          "A mix of bite sized pineapple, watermelon, muskmelon, papaya, apple, pomegranate; perfect to brighten up your day in the morning and fuel you up for the rest of the day.",
        ingredients:
          "Watermelon, Apple, Muskmelon, Pineapple, Papaya, Pomegranate, Honey, Mint leaf",
        nutrition: {},
        };
}]);

oldMenu.service('cartService', ['itemService',function(itemService) {
    this.cart = {};
    
}]);

oldMenu.service('filtersService', [function() {
    this.typeFilter = {};
    this.cuisineFilter = {};
}]);