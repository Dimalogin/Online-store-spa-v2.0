import WomanDressesProductsDatabase from "./womanDressesProductsDatabase.js";

class WomanDressesProductView {
  #womanDressesProductsDatabase = new WomanDressesProductsDatabase();

  constructor() {
    this.#initTemplate();
  }

  #initTemplate() {}
}

const womanDressesProductView = new WomanDressesProductView();
