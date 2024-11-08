import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

class AboutView {
  #DBBasketModel = null;
  #DBProductsModel = null;

  headerSideLinkCount = null;

  constructor() {
    this.#initDBBasketModel();
    this.#initDBProductsModel();

    this.#openDBBasket();
    this.#openDBProducts();

    this.#initTemplate();
    this.#bindListener();

    this.#onCheckDataInStorage();
    this.#getCurrentQuantityProductsFromShoppingCart();
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

  #initTemplate() {
    this.headerSideLinkCount = document.querySelector(
      ".header-side-link__count"
    );
  }

  #bindListener() {}

  #onCheckDataInStorage() {
    this.#DBProductsModel
      .checkDataInStorage()
      .then((state) => {
        state ? null : this.#onAddProductsToStorage();
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

  #getCurrentQuantityProductsFromShoppingCart() {
    this.#DBBasketModel
      .getAllProductsFromBasketStorage()
      .then((result) => {
        this.#renderCurrentNumberProductsCart(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #renderCurrentNumberProductsCart(result) {
    this.headerSideLinkCount.textContent = result.length;
  }
}

const aboutView = new AboutView();