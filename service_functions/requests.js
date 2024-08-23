var defaultCategories = "Bowls";
var defaultCuisines = "";
var defaultPageNumber = 0;
var defaultPageSize = 10;
var defaultCustomerId = 1;

const BASE_URL = "http://localhost:8080/freshmenu";
const ES_BASE_URL = "http://localhost:9200/items/_search"

var fetchItems = async function (
  $http,
  {
    pageSize = defaultPageSize,
    pageNum = defaultPageNumber,
    cuisines = defaultCuisines,
    category = defaultCategories,
    query = "",
  }
) {
  if ($http == null) return null;

  var body = {};
  body.pageNum = pageNum;
  body.pageSize = pageSize;
  body.searchFilters = {};
  body.searchFilters.cuisines = cuisines;
  body.searchFilters.category = category;
  body.searchFilters.query = query;

  const itemsResponse = await $http({
    method: "POST",
    url: BASE_URL + "/items",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return itemsResponse.data;
};

var fetchCategories = async function ($http) {
  if ($http == null) return null;

  const categoriesResponse = await $http.get(BASE_URL + "/categories");
  return categoriesResponse.data;
};

var fetchCuisines = async function ($http) {
  if ($http == null) return null;

  const cuisinesResponse = await $http.get(BASE_URL + "/cuisines");
  return cuisinesResponse.data;
};

var fetchItemDetails = async function ($http = null,{ itemId = 1 }) {
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
    
    var transformed = transformCartResponseItem(cartResponse.data)
    console.log("transformed: ", transformed);
    return transformed;
  };
  
var transformCartResponseItem = function(cartResponse) {
    response = {};
    cartResponse.forEach((item) => {
      response[item.item.id] = item.item;
      response[item.item.id].quantity = item.quantity;
    });

    return response;
}


var updateCart = async function ($http = null, {action = 1, itemId = null, customerId = defaultCustomerId}) {
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

var deleteFromCart = async function ($http = null, {itemId = null, customerId = defaultCustomerId}) {
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

var addItemToBackendCart = async function ($http, {itemId = null, customerId = defaultCustomerId}) {
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

var clearCart = async function($http, {customerId = defaultCustomerId}) {
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
}

var placeOrder = async function($http, {orderItems = [], customerId = defaultCustomerId,}) {

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
  clearCart($http, {customerId: customerId});
}


var searchES = async function($http, query) {
  if($http == null || query == null || query == "") return [];

  var body = {};
  body.size = 5;
  body.query = {};
  body.query.query_string = {};
  body.query.query_string.query = `*${query}*`
  body.query.query_string.fields = ["name", "category", "cuisine"];
  body.query.query_string.analyzer = "standard";

  const searchResponse = await $http({
    method: "POST",
    url: ES_BASE_URL,
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  var transformedSearchResponse = transformSearchResponse(searchResponse.data.hits.hits);
  return transformedSearchResponse;
}

var transformSearchResponse = function(searchResult) {
  var transformedSearchResponse = [];
  searchResult.forEach((res)=> {
    var obj = {};
    obj.id = res._id;
    obj.name = res._source.name;
    transformedSearchResponse.push(obj);
  });
  return transformedSearchResponse;
}