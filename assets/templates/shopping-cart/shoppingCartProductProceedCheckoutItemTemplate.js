const shoppingCartProductProceedCheckoutItemTemplate =
  document.createElement("template");

shoppingCartProductProceedCheckoutItemTemplate.innerHTML = `
<li
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__item"
                  >
                    <div
                      class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__top"
                    >
                      <div
                        class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__icon"
                      >
                        <img
                          src=""
                          alt="dress"
                        />
                        <span
                          class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__quantity"
                          ></span
                        >
                      </div>
                      <div
                        class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__content"
                      >
                        <div
                          class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content__title"
                        >
                          
                        </div>
                        <div
                          class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content__parameters"
                        >
                          <div
                            class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content__color"
                          >
                            <span
                              class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-color__text"
                              >Color:</span
                            >
                            <span
                              class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-color__value"
                              >Black</span
                            >
                          </div>
                          <div
                            class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content__size"
                          >
                            <span
                              class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-size__text"
                              >Size:</span
                            >
                            <span
                              class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item-content-size__value"
                              ></span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-item__price"
                    >
                      
                    </div>
                  </li>
`;

export default shoppingCartProductProceedCheckoutItemTemplate;
