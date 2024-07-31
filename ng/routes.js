
oldMenu.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/home.htm",
        controller: "homeController",
      }).when("/items/:itemID", {
        templateUrl: "pages/item_details.htm",
        controller: "itemDetailsController",
      });
  });
  