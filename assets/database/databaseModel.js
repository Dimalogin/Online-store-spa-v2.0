import {
  openDb,
  addProductsIntoDB,
  readProductFromDB,
} from "./initIndexedDB.js";
import womanDressesProducts from "../data/for-woman/dresses.js";

const storages = [
  { nameStorage: "womanDressesProducts", products: womanDressesProducts },
  {nameStorage:"womanBagsProducts", products:},
  "womanShoesProducts",
  "manCoatProducts",
  "manShoesProducts",
  "manTrousersProducts",
];

class DatabaseProducts {
  #dbBasketName = "BasketStorage";
  #dbProductsName = "ProductsStorage";

  #dbProductsPromise = null;
  #dbBasketPromise = null;

  #emptyStorages = [];

  #productsMigrations = [
    [
      (db) => {
        db.createObjectStore("womanDressesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("womanBagsProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("womanShoesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manCoatProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manShoesProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
      (db) => {
        db.createObjectStore("manTrousersProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    ],
  ];

  #basketMigrations = [
    [
      (db) => {
        db.createObjectStore("productsBasket", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    ],
  ];

  constructor() {
    this.initProductsIndexedDb();
    this.initBasketIndexedDb();

    this.checkingStorageEmptiness();
  }

  initProductsIndexedDb() {
    this.#dbProductsPromise = openDb(
      this.#dbProductsName,
      this.#productsMigrations
    );
  }

  initBasketIndexedDb() {
    this.#dbBasketPromise = openDb(this.#dbBasketName, this.#basketMigrations);
  }

  checkingStorageEmptiness() {
    const storagePromise = new Promise((resolve, reject) => {
      storages.forEach((storage) => {
        this.#dbProductsPromise.then((db) => {
          readProductFromDB(db, storage, 1)
            .then((result) => {
              this.#emptyStorages.push({
                storageName: storage,
                storageData: result,
              });
              if (this.#emptyStorages.length === 6) {
                resolve();
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    });

    storagePromise
      .then(() => {
        this.loadingProductIntoDB();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadingProductIntoDB() {
    this.#emptyStorages.forEach((storage) => {
      if (!storage.storageData) {
        addProductsIntoDB(db, storeName, data);
      }
    });
  }
}

new DatabaseProducts();
