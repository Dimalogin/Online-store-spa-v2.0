const womanDressesModalWindowTemplate = document.createElement("template");

womanDressesModalWindowTemplate.innerHTML = `
 <div class="woman-dresses-products-modal-window__body">
                  <button
                    class="woman-dresses-products-modal-window__close-btn"
                  >
                    <img
                      class="woman-dresses-products-modal-window-close-btn__icon"
                      src="../../assets/images/products/for-woman/dresses/dresses-cross-product.svg"
                      alt='close'
                    />
                  </button>

                  <div class="woman-dresses-products-modal-window__icon">
                    <img
                      src=""
                      alt="dress"
                    />
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
                      >
                        Color
                      </div>
                      <select
                        class="woman-dresses-products-modal-window-price-color__select"
                      ></select>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window-price__size"
                    >
                      <div
                        class="woman-dresses-products-modal-window-price-size__title"
                      >
                        Size
                      </div>
                      <select
                        class="woman-dresses-products-modal-window-price-size__select"
                      ></select>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window__add-to-cart"
                    >
                      <div
                        class="woman-dresses-products-modal-window-add-to-cart__quantity"
                      >
                        <button
                          class="woman-dresses-products-modal-window-add-to-cart-quantity__minus"
                        >
                          <img
                            src="../../assets/images/products/for-woman/dresses/dresses-minus-product.svg"
                            alt="minus"
                          />
                        </button>
                        <span
                          class="woman-dresses-products-modal-window-add-to-cart-quantity__value"
                          >1</span
                        >
                        <button
                          class="woman-dresses-products-modal-window-add-to-cart-quantity__plus"
                        >
                          <img
                            src="../../assets/images/products/for-woman/dresses/dresses-plus-product.svg"
                            alt=""
                          />
                        </button>
                      </div>

                      <button
                        class="woman-dresses-products-modal-window-add-to-cart__add"
                      >
                        Add to cart
                      </button>
                    </div>

                    <div class="woman-dresses-products-modal-window__wishlist">
                      <img
                        class="woman-dresses-products-modal-window-wishlist__icon"
                        src="../../assets/images/products/for-woman/dresses/dresses-product-heart.svg"
                        alt="heart"
                      />
                      <div
                        class="woman-dresses-products-modal-window-wishlist__title"
                      >
                        Add to wishlist
                      </div>
                    </div>

                    <div class="woman-dresses-products-modal-window__fit-guide">
                      <img
                        class="woman-dresses-products-modal-window-fit-guide__icon"
                        src="../../assets/images/products/for-woman/dresses/dresses-ruler-product.svg"
                        alt="ruler"
                      />
                      <div
                        class="woman-dresses-products-modal-window-fit-guide__title"
                      >
                        Size & fit guide
                      </div>
                    </div>

                    <div
                      class="woman-dresses-products-modal-window__drop-down-menu"
                    >
                      
                    </div>
                  </div>
                </div>
`;

export default womanDressesModalWindowTemplate;
