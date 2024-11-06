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
  #shoppingCartProductsList = null;

  #productsShoppingCartStorage = null;

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
      if (event.currentTarget === this.#shoppingCartProductsBody) {
        const target = event.target;

        if (target.matches(".shopping-cart-products__delete-btn")) {
          const productId = Number(
            target.closest(".shopping-cart-products__item").dataset.productId
          );
          this.#onRemoveProductFromShoppingCart(productId);
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
    this.#onShoppingCartProductLoader();
    setTimeout(() => {
      this.#productsShoppingCartStorage = products;

      this.#offShoppingCartProductLoader();

      const numberOfProducts = products.length;

      numberOfProducts === 0
        ? this.#onRenderEmptyList()
        : this.#onRenderShoppingCartTemplate();
    }, 1000);
  }

  #onRenderShoppingCartTemplate() {
    const fullView = shoppingCartListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsList = null;
    this.#shoppingCartProductsList = fullView.querySelector(
      ".shopping-cart-products__list"
    );
    const shoppingCartProductsTotalSubtotalPrice = fullView.querySelector(
      ".shopping-cart-products-total-subtotal__price"
    );
    shoppingCartProductsTotalSubtotalPrice.textContent = `$${this.#getTotalPriceAllProducts()}`;

    this.#onRenderList();
    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(fullView);
  }

  #onRenderList() {
    const fragment = document.createDocumentFragment();

    for (const product of this.#productsShoppingCartStorage) {
      const { id, images, title, price, quantityProducts, color, size } =
        product;

      const fullView = shoppingCartProductTemplate.content.cloneNode(true);
      const productView = fullView.querySelector(
        ".shopping-cart-products__item"
      );
      const productImage = fullView.querySelector(
        ".shopping-cart-products__icon"
      );
      const productTitle = fullView.querySelector(
        ".shopping-cart-products-info__title"
      );
      const productPrice = fullView.querySelector(
        ".shopping-cart-products__price"
      );
      const productQuantityValue = fullView.querySelector(
        ".shopping-cart-products-quantity__value"
      );
      const productColor = fullView.querySelector(
        ".shopping-cart-products-info-color__value"
      );
      const productSize = fullView.querySelector(
        ".shopping-cart-products-info-size__value"
      );

      productView.dataset.productId = id;
      productImage.src = images;
      productTitle.textContent = title;
      productPrice.textContent = price;
      productQuantityValue.textContent = quantityProducts;
      productColor.textContent = color;
      productSize.textContent = size;

      fragment.appendChild(fullView);
    }

    this.#shoppingCartProductsList.innerHTML = "";
    this.#shoppingCartProductsList.appendChild(fragment);
  }

  #getTotalPriceAllProducts() {
    return this.#productsShoppingCartStorage.reduce((summa, product) => {
      let price = parseInt(product.price.match(/\d+/));
      summa += price;
      return summa;
    }, 0);
  }

  #onRenderEmptyList() {
    const fullView = shoppingCartEmptyListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(fullView);
  }

  #onTriggerTotalPrice() {}

  #onRemoveProductFromShoppingCart(productId) {
    console.log(this.#productsShoppingCartStorage);
    this.#DBBasketModel
      .removeProductFromShoppingCart(productId)
      .then((result) => {
        this.#productsShoppingCartStorage =
          this.#productsShoppingCartStorage.filter((product) => {
            return product.id !== productId;
          });
        this.#onUpdateProductAfterRemoveFromShoppingCart(productId);
        this.#onRenderList();
        this.#onTriggerList(this.#productsShoppingCartStorage);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onUpdateProductAfterRemoveFromShoppingCart(productId) {
    this.#DBProductsModel
      .getAllProducts()
      .then((products) => {
        const object = products.find((product) => {
          return product.id === productId;
        });
        const uptadeObject = { ...object, inBasket: !object.inBasket };
        this.#DBProductsModel
          .updateProductIntoStorage(uptadeObject)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    //const uptadeObject = { ...object, inBasket: !object.inBasket };
    // console.log(uptadeObject);
  }

  #increaseNumberProducts() {}
  #decreaseNumberProducts() {}

  #onShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "block";
  }

  #offShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "none";
  }
}

const shoppingCartProductsView = new ShoppingCartProductsView();
