import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

// Templates

import shoppingCartListTemplate from "../../../templates/shopping-cart/shoppingCartTemplate.js";
import shoppingCartEmptyListTemplate from "../../../templates/shopping-cart/shoppingCartEmptyListTemplate.js";
import shoppingCartProductTemplate from "../../../templates/shopping-cart/shoppingCartProductTemplate.js";
import shoppingCartProductProceedCheckoutModalWindowTemplate from "../../../templates/shopping-cart/shoppingCartProductProceedCheckoutModalWindowTemplate.js";
import shoppingCartProductProceedCheckoutItemTemplate from "../../../templates/shopping-cart/shoppingCartProductProceedCheckoutItemTemplate.js";

class ShoppingCartProductsView {
  #DBBasketModel = null;
  #DBProductsModel = null;

  headerSideLinkCount = null;

  #shoppingCartProductsBody = null;
  #shoppingCartProductsLoader = null;
  #shoppingCartProductsList = null;

  #shoppingCartTemplate = null;
  #shoppingCartProductsTotalSubtotalPrice = null;
  #shoppingCartProductsProceedCheckoutModalWindow = null;

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
    this.#getCurrentQuantityProductsFromShoppingCart();
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

        if (target.matches(".shopping-cart-products-quantity__minus")) {
          const shoppingCartProductsItem = target.closest(
            ".shopping-cart-products__item"
          );
          this.#decreaseNumberProducts(shoppingCartProductsItem);
        }

        if (target.matches(".shopping-cart-products-quantity__plus")) {
          const shoppingCartProductsItem = target.closest(
            ".shopping-cart-products__item"
          );
          this.#increaseNumberProducts(shoppingCartProductsItem);
        }

        if (
          target.matches(".shopping-cart-products-total__proceed-to-checkout")
        ) {
          const element = target.closest(".shopping-cart-products__content");

          this.#onGetAllProductsFromBasketStorage(element);
        }

        if (
          target.matches(
            ".shopping-cart-products-proceed-to-checkout-modal-window__close-btn"
          )
        ) {
          this.#closeShoppingCartProductProceedCheckoutModalWindow();
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
    this.headerSideLinkCount = document.querySelector(
      ".header-side-link__count"
    );

    this.#shoppingCartProductsBody = document.querySelector(
      ".shopping-cart-products__body"
    );

    this.#shoppingCartProductsLoader = document.querySelector(
      ".shopping-cart-products__loader"
    );

    this.#shoppingCartTemplate =
      shoppingCartListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsList = this.#shoppingCartTemplate.querySelector(
      ".shopping-cart-products__list"
    );

    this.#shoppingCartProductsTotalSubtotalPrice =
      this.#shoppingCartTemplate.querySelector(
        ".shopping-cart-products-total-subtotal__price"
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
        this.#productsShoppingCartStorage = products;
        this.#onTriggerList(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onTriggerList(products) {
    this.#onShoppingCartProductLoader();
    setTimeout(() => {
      this.#offShoppingCartProductLoader();

      const numberOfProducts = products.length;

      numberOfProducts === 0
        ? this.#onRenderEmptyList()
        : this.#onRenderShoppingCartTemplate();
    }, 1000);
  }

  #onRenderShoppingCartTemplate() {
    this.#shoppingCartTemplate =
      shoppingCartListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsTotalSubtotalPrice =
      this.#shoppingCartTemplate.querySelector(
        ".shopping-cart-products-total-subtotal__price"
      );

    this.#shoppingCartProductsTotalSubtotalPrice.textContent = `$${this.#getTotalPriceAllProducts(
      this.#productsShoppingCartStorage
    )}`;

    this.#shoppingCartProductsList = this.#shoppingCartTemplate.querySelector(
      ".shopping-cart-products__list"
    );

    this.#onRenderList();
    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(this.#shoppingCartTemplate);
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

  #getTotalPriceAllProducts(products) {
    return products.reduce((summa, product) => {
      let price = parseInt(product.price.match(/\d+/));
      const quantity = product.quantityProducts;
      summa += price * quantity;
      return summa;
    }, 0);
  }

  #onRenderEmptyList() {
    const fullView = shoppingCartEmptyListTemplate.content.cloneNode(true);

    this.#shoppingCartProductsBody.innerHTML = "";
    this.#shoppingCartProductsBody.appendChild(fullView);
  }

  #onRemoveProductFromShoppingCart(productId) {
    this.#DBBasketModel
      .removeProductFromShoppingCart(productId)
      .then((result) => {
        this.#productsShoppingCartStorage =
          this.#productsShoppingCartStorage.filter((product) => {
            return product.id !== productId;
          });

        this.#onUpdateProductAfterRemoveFromShoppingCart(productId);
        this.#getCurrentQuantityProductsFromShoppingCart();
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
          .then((result) => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #increaseNumberProducts(product) {
    const productId = Number(product.dataset.productId);
    const productQuantity = product.querySelector(
      ".shopping-cart-products__quantity"
    );
    const productQuantityPlusBtn = product.querySelector(
      ".shopping-cart-products-quantity__plus"
    );

    const productQuantityValue = Number(
      product.querySelector(".shopping-cart-products-quantity__value")
        .textContent
    );

    if (productQuantityValue < 10) {
      productQuantity.style.opacity = 0.4;
      productQuantityPlusBtn.disabled = true;

      this.#onUpdateProductAfterIncrease(productId);
    }
  }

  #decreaseNumberProducts(product) {
    const productId = Number(product.dataset.productId);
    const productQuantity = product.querySelector(
      ".shopping-cart-products__quantity"
    );
    const productQuantityMinusBtn = product.querySelector(
      ".shopping-cart-products-quantity__minus"
    );
    const productQuantityValue = Number(
      product.querySelector(".shopping-cart-products-quantity__value")
        .textContent
    );

    if (productQuantityValue > 1) {
      productQuantity.style.opacity = 0.4;
      productQuantityMinusBtn.disabled = true;

      this.#onUpdateProductAfterDecrease(productId);
    }
  }

  #onUpdateProductAfterIncrease(productId) {
    this.#DBBasketModel
      .getProductFromShoppingCartStorage(productId)
      .then((product) => {
        const updateProduct = {
          ...product,
          quantityProducts: ++product.quantityProducts,
        };

        this.#DBBasketModel
          .updateProductIntoShoppingCartStorage(updateProduct)
          .then((result) => {
            this.#productsShoppingCartStorage =
              this.#productsShoppingCartStorage.map((product) => {
                return product.id === productId ? updateProduct : product;
              });

            this.#onTriggerList(this.#productsShoppingCartStorage);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #onUpdateProductAfterDecrease(productId) {
    this.#DBBasketModel
      .getProductFromShoppingCartStorage(productId)
      .then((product) => {
        const updateProduct = {
          ...product,
          quantityProducts: --product.quantityProducts,
        };

        this.#DBBasketModel
          .updateProductIntoShoppingCartStorage(updateProduct)
          .then((result) => {
            this.#productsShoppingCartStorage =
              this.#productsShoppingCartStorage.map((product) => {
                return product.id === productId ? updateProduct : product;
              });

            this.#onTriggerList(this.#productsShoppingCartStorage);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Proceed Checkout Modal Window

  #onGetAllProductsFromBasketStorage(element) {
    this.#offShoppingCartProductsTotalProceedCheckout(element);
    this.#onShoppingCartProductsTotalProceedCheckoutLoader(element);

    setTimeout(() => {
      this.#DBBasketModel
        .getAllProductsFromBasketStorage()
        .then((products) => {
          this.#onRenderShoppingCartProductProceedCheckoutModalWindow(
            element,
            products
          );
          this.#onShoppingCartProductsTotalProceedCheckout(element);
          this.#offShoppingCartProductsTotalProceedCheckoutLoader(element);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  #onRenderShoppingCartProductProceedCheckoutModalWindow(element, products) {
    this.#shoppingCartProductsProceedCheckoutModalWindow =
      element.querySelector(
        ".shopping-cart-products__proceed-to-checkout-modal-window"
      );

    const fullView =
      shoppingCartProductProceedCheckoutModalWindowTemplate.content.cloneNode(
        true
      );

    const modalWindowList = fullView.querySelector(
      ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary__list"
    );

    modalWindowList.appendChild(
      products.reduce((fragment, product) => {
        const { id, images, color, price, quantityProducts, size, title } =
          product;

        console.log(product);

        const fullViewItem =
          shoppingCartProductProceedCheckoutItemTemplate.content.cloneNode(
            true
          );

        const item = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary__item"
        );
        const itemIcon = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__icon img"
        );
        const itemQuantity = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__quantity"
        );
        const itemTitle = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content__title"
        );
        const itemColorValue = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-color__value"
        );
        const itemSizeValue = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-size__value"
        );
        const itemPrice = fullViewItem.querySelector(
          ".shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__price"
        );

        item.dataset.productId = id;
        itemIcon.src = images;
        itemQuantity.textContent = quantityProducts;
        itemTitle.textContent = title;
        itemColorValue.textContent = color;
        itemSizeValue.textContent = size;
        itemPrice.textContent = price;

        fragment.appendChild(fullViewItem);

        return fragment;
      }, document.createDocumentFragment())
    );

    this.#shoppingCartProductsProceedCheckoutModalWindow.style.display =
      "block";
    this.#shoppingCartProductsProceedCheckoutModalWindow.innerHTML = "";
    this.#shoppingCartProductsProceedCheckoutModalWindow.appendChild(fullView);
  }

  #closeShoppingCartProductProceedCheckoutModalWindow() {
    this.#shoppingCartProductsProceedCheckoutModalWindow.style.display = "none";
    this.#shoppingCartProductsProceedCheckoutModalWindow.innerHTML = "";
  }

  #onShoppingCartProductsTotalProceedCheckout(element) {
    element.querySelector(
      ".shopping-cart-products-total__proceed-to-checkout"
    ).style.display = "flex";
  }

  #offShoppingCartProductsTotalProceedCheckout(element) {
    element.querySelector(
      ".shopping-cart-products-total__proceed-to-checkout"
    ).style.display = "none";
  }

  #onShoppingCartProductsTotalProceedCheckoutLoader(element) {
    element.querySelector(
      ".shopping-cart-products-total-proceed-to-checkout__loader"
    ).style.display = "block";
  }

  #offShoppingCartProductsTotalProceedCheckoutLoader(element) {
    element.querySelector(
      ".shopping-cart-products-total-proceed-to-checkout__loader"
    ).style.display = "none";
  }

  // Header Shopping Cart

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

  /*Utils*/

  #onShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "block";
  }

  #offShoppingCartProductLoader() {
    this.#shoppingCartProductsLoader.style.display = "none";
  }
}

const shoppingCartProductsView = new ShoppingCartProductsView();
