const womanDressesModalWindowTemplate = document.createElement("template");

womanDressesModalWindowTemplate.innerHTML = `
<div class="woman-dresses-products-modal-window__body">
                  <button
                    class="woman-dresses-products-modal-window__close-btn"
                  >
                    <img
                      class="woman-dresses-products-modal-window-close-btn__icon"
                      src="../../assets/images/products/for-woman/dresses/dresses-cross-product.svg"
                    />
                  </button>

                  <div class="woman-dresses-products-modal-window__icon">
                    <img src="" alt="" />
                  </div>
                  <div class="woman-dresses-products-modal-window__content">
                    <div
                      class="woman-dresses-products-modal-window__title"
                    ></div>

                    <div class="woman-dresses-products-modal-window__price">
                      <div
                        class="woman-dresses-products-modal-window-price__new-price"
                      ></div>
                      <div
                        class="woman-dresses-products-modal-window-price__old-price"
                      ></div>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window-price__color"
                    >
                      <div
                        class="woman-dresses-products-modal-window-price-color__title"
                      ></div>
                      <select
                        class="woman-dresses-products-modal-window-price-color__select"
                      ></select>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window-price__size"
                    >
                      <div
                        class="woman-dresses-products-modal-window-price-size__title"
                      ></div>
                      <select
                        class="woman-dresses-products-modal-window-price-size__select"
                      ></select>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window__add-to-cart"
                    >
                      <input
                        class="woman-dresses-products-modal-window-add-to-cart__quantity"
                        type="number"
                        min="1"
                        max="5"
                      />
                      <button
                        class="woman-dresses-products-modal-window-add-to-cart__add"
                      ></button>
                    </div>

                    <div class="woman-dresses-products-modal-window__wishlist">
                      <img
                        class="woman-dresses-products-modal-window-wishlist__icon"
                      />
                      <div
                        class="woman-dresses-products-modal-window-wishlist__title"
                      ></div>
                    </div>

                    <div class="woman-dresses-products-modal-window__fit-guide">
                      <img
                        class="woman-dresses-products-modal-window-fit-guide__icon"
                      />
                      <div
                        class="woman-dresses-products-modal-window-fit-guide__title"
                      ></div>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window__drop-down-menu"
                    >
                      <button
                        class="woman-dresses-products-modal-window-drop-down-menu__open-btn"
                      ></button>
                      <div
                        class="woman-dresses-products-modal-window-drop-down-menu__panel"
                      ></div>

                      <button
                        class="woman-dresses-products-modal-window-drop-down-menu__open-btn"
                      ></button>
                      <div
                        class="woman-dresses-products-modal-window-drop-down-menu__panel"
                      ></div>

                      <button
                        class="woman-dresses-products-modal-window-drop-down-menu__open-btn"
                      ></button>
                      <div
                        class="woman-dresses-products-modal-window-drop-down-menu__panel"
                      ></div>
                    </div>
                  </div>
                </div>
`;

export default womanDressesModalWindowTemplate;
