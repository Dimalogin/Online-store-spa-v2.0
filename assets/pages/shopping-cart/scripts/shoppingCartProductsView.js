import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

// Templates

import shoppingCartListTemplate from "../../../templates/shopping-cart/shoppingCartTemplate.js";
import shoppingCartEmptyListTemplate from "../../../templates/shopping-cart/shoppingCartEmptyListTemplate.js";
import shoppingCartProductTemplate from "../../../templates/shopping-cart/shoppingCartProductTemplate.js";

class ShoppingCartProductsView {
  #DBBasketModel = null;
  #DBProductsModel = null;

  #shoppingCartProductsBody = null;
  #shoppingCartProductsLoader = null;

  #productsShoppingCartStorage = [];

  constructor() {
    this.#initDBBasketModel();
    this.#initDBProductsModel();

    this.#openDBBasket();
    this.#openDBProducts();

    this.#initTemplate();
    this.#bindListener();

    this.#onCheckDataInStorage();
    this.#onCheckProductsInShoppingCartStorage();
  }

  #eventListeners = {
    handleEvent: (event) => {
      console.log(event.currentTarget);
    },
  };

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
    this.#shoppingCartProductsBody = document.querySelector(
      ".shopping-cart-products__body"
    );

    this.#shoppingCartProductsLoader = document.querySelector(
      ".shopping-cart-products__loader"
    );
  }

  #bindListener() {
    this.#shoppingCartProductsBody.addEventListener(
      "click",
      this.#eventListeners
    );
  }

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

  #onCheckProductsInShoppingCartStorage() {
    this.#onShoppingCartProductLoader();

    this.#DBBasketModel
      .getAllProductsFromBasketStorage()
      .then((products) => {
        this.#onTriggerList(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onTriggerList(products) {
    setTimeout(() => {
      this.#productsShoppingCartStorage = products;
      this.#offShoppingCartProductLoader();

      const numberOfProducts = products.length;

      console.log(numberOfProducts);

      numberOfProducts === 0
        ? this.#onRenderEmptyList()
        : this.#onRenderShoppingCartTemplate();
    }, 1000);
  }

  #onRenderShoppingCartTemplate() {
    const fullView = shoppingCartListTemplate.content.cloneNode(true);
    
    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(fullView);
  }

  #onRenderList() {
    console.log("list");
  }

  #onRenderEmptyList() {
    const fullView = shoppingCartEmptyListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(fullView);
  }

  #onShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "block";
  }

  #offShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "none";
  }
}

const shoppingCartProductsView = new ShoppingCartProductsView();
