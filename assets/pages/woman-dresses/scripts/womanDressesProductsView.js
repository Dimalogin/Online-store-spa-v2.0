import DatabaseBasketModel from "../../../database/databaseBasketModel.js";
import DatabaseProductsModel from "../../../database/databaseProductsModel.js";

// Templates

import womanDressesProductsTemplate from "../../../templates/for-woman/womanDressesProductsTemplate.js";
import womanDressesModalWindowTemplate from "../../../templates/for-woman/womanDressesModalWindowTemplate.js";
import womanDressesModalWindowDropDownMenuTemplate from "../../../templates/for-woman/womanDressesModalWindowDropDownMenuTemplate.js";

class WomanDressesProductsView {
  #DBBasketModel = null;
  #DBProductsModel = null;

  #womanDressesProductsList = null;
  #womanDressesProductsModalWindow = null;

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

      if (event.currentTarget === this.#womanDressesProductsModalWindow) {
        const target = event.target;

        if (target.matches(".woman-dresses-products-modal-window__close-btn")) {
          this.#closeProductModalWindow();
        }

        if (
          target.matches(
            ".woman-dresses-products-modal-window-add-to-cart-quantity__minus"
          )
        ) {
          this.#productModalWindowQuantityMinus(target);
        } else if (
          target.matches(
            ".woman-dresses-products-modal-window-add-to-cart-quantity__plus"
          )
        ) {
          this.#productModalWindowQuantityPlus(target);
        }

        if (
          target.matches(
            ".woman-dresses-products-modal-window-add-to-cart__add"
          )
        ) {
          console.log("add");
        }

        if (
          target.matches(
            ".woman-dresses-products-modal-window-drop-down-menu__open-btn"
          )
        ) {
          this.#openDropDownMenu(target);
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

    this.#womanDressesProductsModalWindow = document.querySelector(
      ".woman-dresses-products__modal-window"
    );
  }

  #bindListener() {
    this.#womanDressesProductsList.addEventListener(
      "click",
      this.#eventListeners
    );
    this.#womanDressesProductsModalWindow.addEventListener(
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

      this.#openProductModalWindow(product);
    });
  }

  #openProductModalWindow(product) {
    const { id, images, title, price, discount, colors, sizes, dropDownMenu } =
      product;

    const fullView = womanDressesModalWindowTemplate.content.cloneNode(true);
    const modalWindow = fullView.querySelector(
      ".woman-dresses-products-modal-window__body"
    );
    const modalWindowIcon = fullView.querySelector(
      ".woman-dresses-products-modal-window__icon img"
    );
    const modalWindowTitle = fullView.querySelector(
      ".woman-dresses-products-modal-window__title"
    );
    const modalWindowNewPrice = fullView.querySelector(
      ".woman-dresses-products-modal-window-price__new-price"
    );
    const modalWindowOldPrice = fullView.querySelector(
      ".woman-dresses-products-modal-window-price__old-price"
    );
    const modalWindowColorSelect = fullView.querySelector(
      ".woman-dresses-products-modal-window-price-color__select"
    );
    const modalWindowSizeSelect = fullView.querySelector(
      ".woman-dresses-products-modal-window-price-size__select"
    );
    const modalWindowDropDownMenu = fullView.querySelector(
      ".woman-dresses-products-modal-window__drop-down-menu"
    );

    modalWindow.dataset.productId = id;
    modalWindowIcon.src = images.catalogImage;
    modalWindowTitle.textContent = title;
    discount
      ? (modalWindowOldPrice.textContent = discount)
      : (modalWindowOldPrice.textContent = "");

    modalWindowNewPrice.textContent = price;
    modalWindowColorSelect.appendChild(
      this.#createProductModalWindowColorsSelect(colors)
    );
    modalWindowSizeSelect.appendChild(
      this.#createProductModalWindowSizesSelect(sizes)
    );

    modalWindowDropDownMenu.appendChild(
      this.#createProductModalWindowDropDownMenu(dropDownMenu)
    );

    this.#womanDressesProductsModalWindow.style.display = "block";
    this.#womanDressesProductsModalWindow.innerHTML = "";
    this.#womanDressesProductsModalWindow.appendChild(fullView);
  }

  #closeProductModalWindow() {
    this.#womanDressesProductsModalWindow.style.display = "none";
    this.#womanDressesProductsModalWindow.innerHTML = "";
  }

  #openDropDownMenu(element) {
    element.classList.toggle(
      "woman-dresses-products-modal-window-drop-down-menu__open-btn--active"
    );

    const panel = element.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  #productModalWindowQuantityMinus(element) {
    const quantityElement = element.nextElementSibling;
    let quantityValue = Number(quantityElement.textContent);
    quantityValue > 1 ? (quantityElement.textContent = --quantityValue) : null;
  }

  #productModalWindowQuantityPlus(element) {
    const quantityElement = element.previousElementSibling;
    let quantityValue = Number(quantityElement.textContent);
    quantityValue < 10 ? (quantityElement.textContent = ++quantityValue) : null;
  }

  #createProductModalWindowColorsSelect(colors) {
    return colors.reduce((fragment, color) => {
      const option = new Option(color);
      option.value = color;
      fragment.appendChild(option);

      return fragment;
    }, document.createDocumentFragment());
  }

  #createProductModalWindowSizesSelect(sizes) {
    return sizes.reduce((fragment, size) => {
      const option = new Option(size);
      option.value = size;
      fragment.appendChild(option);

      return fragment;
    }, document.createDocumentFragment());
  }

  #createProductModalWindowDropDownMenu(dropDownMenu) {
    const fragment = document.createDocumentFragment();

    for (const element of dropDownMenu) {
      const fullView =
        womanDressesModalWindowDropDownMenuTemplate.content.cloneNode(true);
      const dropDownMenuBtn = fullView.querySelector(
        ".woman-dresses-products-modal-window-drop-down-menu__open-btn"
      );
      const dropDownMenuPanel = fullView.querySelector(
        ".woman-dresses-products-modal-window-drop-down-menu__panel"
      );

      dropDownMenuBtn.textContent = element.title;

      Array.isArray(element.text)
        ? dropDownMenuPanel.appendChild(
            element.text.reduce((fragment, item) => {
              const li = document.createElement("li");
              li.classList.add(
                "woman-dresses-products-modal-window-drop-down-menu-panel__item"
              );
              li.textContent = item;

              fragment.appendChild(li);

              return fragment;
            }, document.createDocumentFragment())
          )
        : (dropDownMenuPanel.textContent = element.text);

      fragment.appendChild(fullView);
    }

    return fragment;
  }
}

const womanDressesProductsView = new WomanDressesProductsView();
