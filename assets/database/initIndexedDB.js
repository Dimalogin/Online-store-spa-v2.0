export function openDb(dbName, dbMigrations) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbMigrations.length);

    request.addEventListener("error", function () {
      reject(request.error);
    });

    request.addEventListener("success", function () {
      resolve(request.result);
    });

    request.addEventListener("upgradeneeded", function (event) {
      const db = request.result;
      const { oldVersion } = event;

      for (const migration of dbMigrations[oldVersion]) {
        migration(db);
      }
    });
  });
}

export function addProductsIntoDB(db, storeName, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    const addRequest = objectStore.add(data);

    addRequest.addEventListener("error", function () {
      reject(addRequest.error);
    });

    addRequest.addEventListener("success", function () {
      console.log("succses");

      resolve(addRequest.result);
    });
  });
}

export function readProductFromDB(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.get(key);

    request.addEventListener("error", function () {
      reject(request.error);
    });

    request.addEventListener("success", function () {
      resolve(request.result);
    });
  });
}
