import DatabaseProducts from "../../../database/databaseProductsModel.js";

export default class WomanDressesProductsDatabase {
  #storageName = "womanDressesProducts";
  #databaseProducts = null;

  constructor() {
    this.#initDatabase();
    this.#initStorageName();
    this.#startIndexedDb();
  }

  #initDatabase() {
    this.#databaseProducts = new DatabaseProducts();
  }

  #initStorageName() {
    this.#databaseProducts.initStorageName(this.#storageName);
  }

  #startIndexedDb() {
    this.#databaseProducts.startIndexedDb();
  }
}
