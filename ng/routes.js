
oldMenu.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/home.htm",
        controller: "homeController",
      }).when("/items/:itemId", {
        templateUrl: "pages/item_details.htm",
        controller: "itemDetailsController",
      });
  });
  