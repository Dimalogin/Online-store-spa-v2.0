export default class HeaderDropdown {
  #headerLinkDropdown = null;
  #headerDropdown = null;

  dropdownMenuActive = false;

  constructor() {
    this.#initTemplate();
    this.#bindListener();
  }

  #initTemplate() {
    this.#headerLinkDropdown = document.querySelector(
      ".header__link--dropdown"
    );
    this.#headerDropdown = document.querySelector(".header__dropdown");
  }

  #bindListener() {
    this.#headerLinkDropdown.addEventListener(
      "mouseover",
      this.#showDropdownByLink.bind(this)
    );

    this.#headerLinkDropdown.addEventListener(
      "mouseout",
      this.#hideDropdownByLink.bind(this)
    );

    this.#headerDropdown.addEventListener(
      "mouseover",
      this.#showDropdown.bind(this)
    );

    this.#headerDropdown.addEventListener(
      "mouseout",
      this.#hideDropdown.bind(this)
    );
  }

  #showDropdownByLink() {
    this.#headerDropdown.style.display = "block";
  }

  #hideDropdownByLink() {
    setTimeout(() => {
      if (this.dropdownMenuActive === false) {
        this.#headerDropdown.style.display = "none";
      }
    }, 200);
  }

  #showDropdown() {
    this.dropdownMenuActive = true;
    this.#headerDropdown.style.display = "block";
  }

  #hideDropdown() {
    this.dropdownMenuActive = false;
    this.#headerDropdown.style.display = "none";
  }
}
