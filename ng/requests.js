var defaultbrand = "";
var defaultcategories = "";
var defaultPageNumber = 0;
var defaultPageSize = 10;
var defaultCustomerId = 1;

const BASE_URL = "http://localhost:8080/freshmenu";
const ES_BASE_URL = "http://localhost:9200/items/_search";

var fetchItems = async function (
  $http,
  {
    pageSize = defaultPageSize,
    pageNum = defaultPageNumber,
    categories = defaultcategories,
    brand = defaultbrands,
    query = "",
  }
) {
  if ($http == null) return null;

  var body = {};
  body.pageNum = pageNum;
  body.pageSize = pageSize;
  body.searchFilters = {};
  body.searchFilters.categories = categories;
  body.searchFilters.brand = brand;
  body.searchFilters.query = query;

  const itemsResponse = await $http({
    method: "POST",
    url: BASE_URL + "/items",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return itemsResponse.data;
};

var fetchbrands = async function ($http) {
  if ($http == null) return null;

  const brandsResponse = await $http.get(BASE_URL + "/brands");
  return brandsResponse.data;
};

var fetchcategories = async function ($http) {
  if ($http == null) return null;

  const categoriesResponse = await $http.get(BASE_URL + "/categories");
  return categoriesResponse.data;
};

var fetchItemDetails = async function ($http = null, { itemId = 1 }) {
  if ($http == null) return null;

  var body = {};

  const itemResponse = await $http({
    method: "GET",
    url: BASE_URL + "/items/" + itemId,
    data: body,
    headers: { "Content-Type": "application/json" },
  });

  return itemResponse.data;
};

var fetchCart = async function ($http = null) {
  if ($http == null) return null;

  const cartResponse = await $http({
    method: "GET",
    url: BASE_URL + "/cart/" + defaultCustomerId,
    headers: { "Content-Type": "application/json" },
  });

  var transformed = transformCartResponseItem(cartResponse.data);
  console.log("transformed: ", transformed);
  return transformed;
};

var transformCartResponseItem = function (cartResponse) {
  response = {};
  cartResponse.forEach((item) => {
    response[item.item.id] = item.item;
    response[item.item.id].quantity = item.quantity;
  });

  return response;
};

var updateCart = async function (
  $http = null,
  { action = 1, itemId = null, customerId = defaultCustomerId }
) {
  if ($http == null || itemId == null) return null;

  var body = {};
  body.action = action;
  body.itemId = itemId;
  body.customerId = customerId;

  const cartResponse = await $http({
    method: "POST",
    url: BASE_URL + "/cart/update",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(cartResponse);
};

var deleteFromCart = async function (
  $http = null,
  { itemId = null, customerId = defaultCustomerId }
) {
  if ($http == null || itemId == null) return null;

  var body = {};
  body.itemId = itemId;
  body.customerId = customerId;

  const cartResponse = await $http({
    method: "DELETE",
    url: BASE_URL + "/cart",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(cartResponse);
};

var addItemToBackendCart = async function (
  $http,
  { itemId = null, customerId = defaultCustomerId }
) {
  if ($http == null || itemId == null) return null;

  var body = {};
  body.itemId = itemId;
  body.customerId = customerId;

  const cartResponse = await $http({
    method: "POST",
    url: BASE_URL + "/cart",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(cartResponse);
};

var clearCart = async function ($http, { customerId = defaultCustomerId }) {
  if ($http == null) return null;
  var body = {};
  body.customerId = customerId;

  const cartResponse = await $http({
    method: "DELETE",
    url: BASE_URL + "/cart/clear",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(cartResponse);
};

var placeOrder = async function (
  $http,
  { orderItems = [], customerId = defaultCustomerId }
) {
  if ($http == null || orderItems.length == 0) return null;
  var body = {};
  body.customerId = customerId;
  body.orderItems = orderItems;

  const orderResponse = await $http({
    method: "POST",
    url: BASE_URL + "/orders",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(orderResponse);
  clearCart($http, { customerId: customerId });
};

var searchES = async function ($http, query) {
  if ($http == null || query == null || query == "") return [];

  var body = {};
  body.size = 5;
  body.query = {};
  body.query.query_string = {};
  body.query.query_string.query = `*${query}*`;
  body.query.query_string.fields = ["name", "brand", "category"];
  body.query.query_string.analyzer = "standard";

  const searchResponse = await $http({
    method: "POST",
    url: ES_BASE_URL,
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  var transformedSearchResponse = transformSearchResponse(
    searchResponse.data.hits.hits
  );
  return transformedSearchResponse;
};

var transformSearchResponse = function (searchResult) {
  var transformedSearchResponse = [];
  searchResult.forEach((res) => {
    var obj = {};
    obj.id = res._id;
    obj.name = res._source.name;
    transformedSearchResponse.push(obj);
  });
  return transformedSearchResponse;
};

define(["app"], function (oldMenu) {
  oldMenu.service("requestsService", [
    function () {
      const db = firebase.firestore();

      this.getItems = async function (brands, categories, sizes, searchQuery) {
        var items = [];
        var query = db.collection("items");

        if (brands.length > 0) {
          query = query.where("brand", "in", brands);
        }
        if(categories.length > 0) {
          query = query.where("category", "in", categories);
        }
        if(sizes.length > 0) {
          query = query.where("sizes", "array-contains-any", sizes)

        }
        var querySnapshot = await query.get();

        querySnapshot.forEach((doc) => {
          var item = doc.data();
          item.id = doc.id;
          if (
            searchQuery == "" ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            items.push(item);
          }
        });
        return items;
      };

      this.getBrands = async function () {
        var brands = [];
        var query = db.collection("brands");

        var querySnapshot = await query.get();
        querySnapshot.forEach((doc) => {
          var item = doc.data();
          item.id = doc.id;
          brands.push(item);
        });
        return brands;
      };

      this.getCategories = async function () {
        var categories = [];
        var query = db.collection("misc").doc("categories");
        var doc = await query.get();

        var categories = doc.data().categories;

        return categories;
      };

      this.getItemById = async function (itemId) {
        var query = db.collection("items");
        var doc = await query.doc(itemId).get();

        if (!doc.exists) {
          console.log("doc doesnt exist");
          return null;
        }

        var item = doc.data();
        item.id = doc.id;

        return item;
      };

      this.addItem = async function (data) {
        db.collection("items")
          .add(data)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      };
    },
  ]);
});