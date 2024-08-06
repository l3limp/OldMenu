require.config({
  paths: {
    angular: "//code.angularjs.org/1.3.0-rc.1/angular.min",
    "angular-route": "//code.angularjs.org/1.3.0-rc.1/angular-route.min",
    "ui-bootstrap":
      "//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min",
    app: "app",
    routes: "routes",
    services: "services",
    directives: "directives",
    bodyController: "controllers/bodyController",
    buyNowModalController: "controllers/buyNowModalController",
    buyNowModalInstanceController: "controllers/buyNowModalInstanceController",
    homeController: "controllers/homeController",
    itemDetailsController: "controllers/itemDetailsController",
  },
  shim: {
    angular: { exports: "angular" },
    "angular-route": { deps: ["angular"] },
    "ui-bootstrap": { deps: ["angular"] },
    app: { deps: ["angular", "angular-route", "ui-bootstrap"] },
    routes: { deps: ["app"] },
    services: { deps: ["app"] },
    directives: { deps: ["app"] },
    bodyController: { deps: ["app"] },
    buyNowModalController: { deps: ["app"] },
    buyNowModalInstanceController: { deps: ["app"] },
    homeController: { deps: ["app"] },
    itemDetailsController: { deps: ["app"] },
  },
});

require([
  "app",
  "routes",
  "services",
  "directives",
  "bodyController",
  "buyNowModalController",
  "buyNowModalInstanceController",
  "homeController",
  "itemDetailsController",
], function (app) {
  angular.bootstrap(document, ["oldMenu"]);
});
