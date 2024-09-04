var openDatabase = function() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ecommerceDB", 3);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("brands")) {
        db.createObjectStore("brands", { keyPath: "data" });
      }
      if (!db.objectStoreNames.contains("categories")) {
        db.createObjectStore("categories", { keyPath: "data" });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Error opening database");
    };
  });
}

var addItem = function(db, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["items" ], "readwrite");
    const request = transaction.objectStore("items" ).put(item);

    request.onsuccess = function () {
      resolve();
    };

    request.onerror = function (event) {
      reject("Error adding item" );
    };
  });
}

var getItems = function(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["items" ], "readonly");
    const request = transaction.objectStore("items").getAll();

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Error fetching items");
    };
  });
}


define(["app"], function (oldMenu) {
  oldMenu.factory("ItemServiceDB", function ($http, $q) {
    const service = {};

    service.getItems = function (body) {
      const deferred = $q.defer();
      openDatabase()
        .then((db) => {
          return getItems(db);
        })
        .then((items) => {
          if (items.length > 0) {
            deferred.resolve(items);
          } else {
            fetchItems(
            $http,
              body)
              .then((response) => {
                const items = response;
                openDatabase()
                  .then((db) => {
                    const promises = items.map((item) => addItem(db, item));
                    return $q.all(promises);
                  })
                  .then(() => {
                    deferred.resolve(items);
                  });
              })
              .catch((err) => deferred.reject(err));
          }
        })
        .catch((err) => deferred.reject(err));

      return deferred.promise;
    };

    return service;
  });
});
