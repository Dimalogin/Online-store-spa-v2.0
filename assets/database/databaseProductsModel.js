import {
  openDb,
  addProductsIntoDB,
  readProductFromDB,
  getAllProductsFromDB,
} from "./functionalIndexedDB.js";

import womanDressesProducts from "../data/for-woman/dresses.js";
/*
import womanShoesProducts from "../data/for-woman/shoes.js";
import manCoatProducts from "../data/for-man/coat.js";
import manTrousersProducts from "../data/for-man/trousers.js";
*/

export default class DatabaseProductsModel {
  #dbProductsName = "ProductsStorage";
  #storageName = "womanDressesProducts";
  #dbProductsPromise = null;

  #emptyStorages = [];

  #productsMigrations = [
    (db) => {
      db.createObjectStore(this.#storageName, {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  ];

  openIndexedDb() {
    this.#dbProductsPromise = openDb(
      this.#dbProductsName,
      this.#productsMigrations
    );
  }

  checkDataInStorage() {
    return new Promise((resolve, reject) => {
      this.#dbProductsPromise.then((db) => {
        readProductFromDB(db, this.#storageName, 1)
          .then((products) => {
            products ? resolve(true) : resolve(false);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  getAllTasks() {
    return this.#dbProductsPromise.then((db) => {
      return getAllProductsFromDB(db, this.#storageName);
    });
  }

  addProductsToStorage() {
    return new Promise((resolve, reject) => {
      womanDressesProducts
        .forEach((product, index) => {
          const l = womanDressesProducts.length - 1;

          this.#dbProductsPromise.then((db) => {
            addProductsIntoDB(db, this.#storageName, product);
          });

          if (l === index) {
            resolve(true);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

/*

 const checkingStoragePromise = new Promise((resolve, reject) => {
      storages.forEach((storage) => {
        this.#dbProductsPromise.then((db) => {
          readProductFromDB(db, storage.nameStorage, 1)
            .then((result) => {
              this.#emptyStorages.push({
                ...storage,
                storageData: result,
              });

              if (this.#emptyStorages.length === 4) {
                resolve();
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    });

    checkingStoragePromise
      .then(() => {
        this.loadingProductIntoDB();
      })
      .catch((err) => {
        console.log(err);
      });

*/

/*

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
        db.createObjectStore("manTrousersProducts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },

*/
