export default class HeaderSideNavigation {
  #headerMenu = null;
  #headerSideNavigation = null;
  #headerSideNavigationCloseBtn = null;

  constructor() {
    this.#initTemplate();
    this.#bindListener();
  }

  #initTemplate() {
    this.#headerMenu = document.querySelector(".header__menu");

    this.#headerSideNavigation = document.querySelector(
      ".header-side-navigation"
    );

    this.#headerSideNavigationCloseBtn = document.querySelector(
      ".header-side-navigation__close-btn"
    );
  }

  #bindListener() {
    this.#headerMenu.addEventListener(
      "click",
      this.#openSideNavigationPanel.bind(this)
    );

    this.#headerSideNavigationCloseBtn.addEventListener(
      "click",
      this.#closeSideNavigationPanel.bind(this)
    );
  }

  #openSideNavigationPanel() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 400) {
      this.#headerSideNavigation.style.display = "block";
      this.#headerSideNavigation.style.width = "300px";
    } else {
      this.#headerSideNavigation.style.display = "block";
      this.#headerSideNavigation.style.width = "100%";
    }
  }

  #closeSideNavigationPanel() {
    this.#headerSideNavigation.style.display = "none";
  }
}
