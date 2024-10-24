import {
  openDb,
  getAllProductsFromDB,
  addProductsIntoDB,
  readProductFromDB,
} from "./functionalIndexedDB.js";

export default class DatabaseBasketModel {
  #dbBasketName = "BasketStorage";
  #dbBasketPromise = null;

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

  initBasketIndexedDb() {
    this.#dbBasketPromise = openDb(this.#dbBasketName, this.#basketMigrations);
  }
}
