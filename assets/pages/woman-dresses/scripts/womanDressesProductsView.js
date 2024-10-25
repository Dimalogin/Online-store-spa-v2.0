import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

// Templates

import womanDressesProductsTemplate from "../../../templates/for-woman/womanDressesProductsTemplate.js";

class WomanDressesProductsView {
  #DBBasketModel = null;
  #DBProductsModel = null;
  #womanDressesProductsList = null;
  #dressesProducts = [];

  constructor() {
    this.#initDBBasketModel();
    this.#initDBProductsModel();

    this.#openDBBasket();
    this.#openDBProducts();

    this.#initTemplate();
    this.#bindListener();

    this.#onCheckDataInStorage();

    //this.#onGetAllProducts();

    // this.#checkingStorage();

    //this.#onAddProductsToStorage();
  }

  #eventListeners = {
    handleEvent: (event) => {
      if (event.currentTarget === this.#womanDressesProductsList) {
        const target = event.target;

        const productId = Number(
          target.closest(".woman-dresses-products__column").dataset.productId
        );

        if (target.matches(".woman-dresses-products-select-option__btn")) {
          this.#onGetProduct(productId);
        }
      }
    },
  };

  #initDBBasketModel() {
    this.#DBBasketModel = new DatabaseBasketModel();
  }

  #initDBProductsModel() {
    this.#DBProductsModel = new DatabaseProductsModel();
  }

  #openDBBasket() {}

  #openDBProducts() {
    this.#DBProductsModel.openIndexedDb();
  }

  #initTemplate() {
    this.#womanDressesProductsList = document.querySelector(
      ".woman-dresses-products__list"
    );
  }

  #bindListener() {
    this.#womanDressesProductsList.addEventListener(
      "click",
      this.#eventListeners
    );
  }

  #onCheckDataInStorage() {
    this.#DBProductsModel
      .checkDataInStorage()
      .then((state) => {
        state ? this.#onGetAllProducts() : this.#onAddProductsToStorage();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onAddProductsToStorage() {
    this.#DBProductsModel
      .addProductsToStorage()
      .then((data) => {
        data ? this.#onGetAllProducts() : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onGetAllProducts() {
    this.#DBProductsModel.getAllTasks().then((products) => {
      this.#dressesProducts = products;
      this.#onTriggerList(this.#dressesProducts);
    });
  }

  #onTriggerList(products) {
    const fragment = document.createDocumentFragment();

    for (const product of products) {
      const { id, images, title, price, discount, sale } = product;

      const element = womanDressesProductsTemplate.content.cloneNode(true);
      const elementLi = element.querySelector(
        ".woman-dresses-products__column"
      );
      const elementItem = element.querySelector(
        ".woman-dresses-products__item"
      );
      const elementLiIcon = element.querySelector(
        ".woman-dresses-products__icon img"
      );
      const elementLiTitle = element.querySelector(
        ".woman-dresses-products__title"
      );
      const elementLiNewPrice = element.querySelector(
        ".woman-dresses-products-price__new-price"
      );
      const elementLiOldPrice = element.querySelector(
        ".woman-dresses-products-price__old-price"
      );
      const elementLiSale = element.querySelector(
        ".woman-dresses-products__sale"
      );

      elementLi.dataset.productId = id.toString();
      elementLiIcon.src = images.catalogImage;
      elementLiTitle.textContent = title;
      elementLiNewPrice.textContent = price;
      discount
        ? (elementLiOldPrice.textContent = discount)
        : (elementLiOldPrice.textContent = "");

      sale
        ? elementLiSale.classList.add("woman-dresses-products__sale--completed")
        : null;

      fragment.appendChild(element);
    }

    this.#womanDressesProductsList.innerHTML = "";
    this.#womanDressesProductsList.appendChild(fragment);
  }

  #onGetProduct(productId) {
    this.#DBProductsModel.getAllTasks().then((products) => {
      const product = products.find((product) => {
        return product.id === productId;
      });

      this.#openProductModal(product);
    });
  }

  #openProductModal(product) {}
}

const womanDressesProductsView = new WomanDressesProductsView();
