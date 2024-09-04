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
    requests: "./requests",
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
    bodyController: { deps: ["app", "requests", "indexdb"] },
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
  "itemDetailsController",
], function (app) {

  var firebaseConfig = {
    apiKey: "AIzaSyACcJQEPRSRAEw3hqyI_LSBxQl83CEJ-9c",
    authDomain: "mixnmatch-ae531.firebaseapp.com",
    projectId: "mixnmatch-ae531",
    storageBucket: "mixnmatch-ae531.appspot.com",
    messagingSenderId: "159319852029",
    appId: "1:159319852029:web:994631429da0df04a5cf94",
    measurementId: "G-K50561VHD1"
  };
  
  firebase.initializeApp(firebaseConfig);

  angular.bootstrap(document, ["oldMenu"]);
});


