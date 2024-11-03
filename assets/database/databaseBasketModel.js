import {
  openDb,
  getAllProductsFromDB,
  addProductsIntoDB,
  readProductFromDB,
} from "./functionalIndexedDB.js";

export default class DatabaseBasketModel {
  #dbBasketName = "BasketStorage";
  #storageBasketName = "productsBasket";
  #dbBasketPromise = null;

  #basketMigrations = [
    (db) => {
      db.createObjectStore(this.#storageBasketName, {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  ];

  openBasketIndexedDb() {
    this.#dbBasketPromise = openDb(this.#dbBasketName, this.#basketMigrations);
  }

  addProductToBasket(product) {
    return this.#dbBasketPromise.then((db) => {
      return addProductsIntoDB(db, this.#storageBasketName, product);
    });
  }

  getAllProductsFromBasketStorage() {
    return this.#dbBasketPromise.then((db) => {
      return getAllProductsFromDB(db, this.#storageBasketName);
    });
  }
}
