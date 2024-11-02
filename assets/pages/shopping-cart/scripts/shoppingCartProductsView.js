import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

// Templates

import shoppingCartListTemplate from "../../../templates/shopping-cart/shoppingCartListTemplate.js";
import shoppingCartEmptyListTemplate from "../../../templates/shopping-cart/shoppingCartEmptyListTemplate.js";

class ShoppingCartProductsView {
  #DBBasketModel = null;
  #DBProductsModel = null;

  constructor() {
    this.#initDBBasketModel();
    this.#initDBProductsModel();

    this.#openDBBasket();
    this.#openDBProducts();

    this.#initTemplate();
    this.#bindListener();

    this.#onCheckDataInStorage();
  }

  #initDBBasketModel() {
    this.#DBBasketModel = new DatabaseBasketModel();
  }

  #initDBProductsModel() {
    this.#DBProductsModel = new DatabaseProductsModel();
  }

  #openDBBasket() {
    this.#DBBasketModel.openBasketIndexedDb();
  }

  #openDBProducts() {
    this.#DBProductsModel.openProductsIndexedDb();
  }

  #initTemplate() {}
  #bindListener() {}

  #onCheckDataInStorage() {
    this.#DBProductsModel
      .checkDataInStorage()
      .then((state) => {
        this.#onAddProductsToStorage();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onAddProductsToStorage() {
    this.#DBProductsModel
      .addProductsToStorage()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const shoppingCartProductsView = new ShoppingCartProductsView();
