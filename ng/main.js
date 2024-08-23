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
    requests: "../service_functions/requests",
    indexdb: "../service_functions/indexdb",
  },
  shim: {
    angular: { exports: "angular" },
    "angular-route": { deps: ["angular"] },
    "ui-bootstrap": { deps: ["angular"] },
    app: { deps: ["angular", "angular-route", "ui-bootstrap"] },
    routes: { deps: ["app"] },
    services: { deps: ["app"] },
    directives: { deps: ["app"] },
    bodyController: { deps: ["app", "requests", "indexdb", ] },
    buyNowModalController: { deps: ["app", "requests", "indexdb"] },
    buyNowModalInstanceController: { deps: ["app", "requests", "indexdb"] },
    homeController: { deps: ["app", "requests", "indexdb"] },
    itemDetailsController: { deps: ["app", "requests", "indexdb"] },
    indexdb: {deps: ["app", "requests"]},
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
  "itemDetailsController"
], function (app) {
  angular.bootstrap(document, ["oldMenu"]);
});
