export default class HeaderSideDropdownMenu {
  #headerSideNavigationLinkProducts = null;

  constructor() {
    this.#initTemplate();
    this.#bindListener();
  }

  #initTemplate() {
    this.#headerSideNavigationLinkProducts = document.querySelector(
      ".header-side-navigation__link--products"
    );
  }

  #bindListener() {
    this.#headerSideNavigationLinkProducts.addEventListener(
      "click",
      this.#openDropdownMenuProducts.bind(this)
    );
  }

  #openDropdownMenuProducts(event) {
    const element = event.target;
    const panel = element.nextElementSibling;
    const classCurrentElement = element.classList[1];

    element.classList.toggle(`${classCurrentElement}-active`);

    if (panel.style.height) {
      panel.style.height = null;
      panel.style.margin = "0px 0px 0px 0px";
    } else {
      panel.style.height = "180px";
      panel.style.margin = "10px 0px 0px 0px";
    }
  }
}

const headerSideDropdownMenu = new HeaderSideDropdownMenu();
