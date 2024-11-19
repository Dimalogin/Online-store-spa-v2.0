const shoppingCartProductProceedCheckoutModalWindowTemplate =
  document.createElement("template");

shoppingCartProductProceedCheckoutModalWindowTemplate.innerHTML = `
<div
              class="shopping-cart-products-proceed-to-checkout-modal-window__body"
            >
              <button
                class="shopping-cart-products-proceed-to-checkout-modal-window__close-btn"
              >
                <img
                  class="shopping-cart-products-proceed-to-checkout-modal-window-close-btn__icon"
                  src="./assets/images/shopping-cart/shopping-cart-products-proceed-checkout-modal-window-cross.svg"
                  alt="close"
                />
              </button>

              <!--Billing Details-->

              <div
                class="shopping-cart-products-proceed-to-checkout-modal-window__billing-details"
              >
                <div
                  class="proceed-to-checkout-modal-window-billing-details__title"
                >
                  Billing Details
                </div>
                <form
                  class="proceed-to-checkout-modal-window-billing-details__form"
                >
                  <div
                    class="proceed-to-checkout-modal-window-billing-details-form__contact"
                  >
                    <label
                      for="contact"
                      class="proceed-to-checkout-modal-window-billing-details-form-contact__label"
                      >Contact</label
                    >
                    <input
                      id="contact"
                      class="proceed-to-checkout-modal-window-billing-details-form-contact__input"
                      type="text"
                      name="contact"
                      placeholder="Email or mobile phone number"
                      required
                    />
                  </div>



                  <div
                    class="proceed-to-checkout-modal-window-billing-details-form__user-data"
                  >
                    <div
                      class="proceed-to-checkout-modal-window-billing-details-form-user-data__name"
                    >
                      <label
                        for="user-data-name"
                        class="proceed-to-checkout-modal-window-billing-details-form-user-data-name__label"
                        >First Name</label
                      >
                      <input
                        id="user-data-name"
                        class="proceed-to-checkout-modal-window-billing-details-form-user-data-name__input"
                        type="text"
                        name="user-data-name"
                        placeholder="First Name"
                        required
                      />
                    </div>

                    <div
                      class="proceed-to-checkout-modal-window-billing-details-form-user-data__lastname"
                    >
                      <label
                        for="user-data-lastname"
                        class="proceed-to-checkout-modal-window-billing-details-form-user-data-lastname__label"
                        >Last Name</label
                      >
                      <input
                        id="user-data-lastname"
                        class="proceed-to-checkout-modal-window-billing-details-form-user-data-lastname__input"
                        type="text"
                        name="user-data-lastname"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>

                  <div
                    class="proceed-to-checkout-modal-window-billing-details-form__delivery"
                  >
                    <label
                      class="proceed-to-checkout-modal-window-billing-details-form-delivery__title"
                    >
                      Delivery
                    </label>

                    <select
                      class="proceed-to-checkout-modal-window-billing-details-form-delivery__country"
                      name = 'country'
                    >
                      <option value="Belarus">Belarus</option>
                      <option value="Russia">Russia</option>
                      <option value="Ukraine">Ukraine</option>
                    </select>
                    <input
                      class="proceed-to-checkout-modal-window-billing-details-form-delivery__address"
                      type="text"
                      name="delivery-address"
                      placeholder="Address"
                      required
                    />
                    <input
                      class="proceed-to-checkout-modal-window-billing-details-form-delivery__apartment"
                      type="text"
                      name="delivery-apartment"
                      placeholder="Apartment"
                      required
                    />
                    <div
                      class="proceed-to-checkout-modal-window-billing-details-form-delivery__bottom"
                    >
                      <input
                        class="proceed-to-checkout-modal-window-billing-details-form-delivery__city"
                        type="text"
                        name="delivery-city"
                        placeholder="City"
                        required
                      />

                      <input
                        class="proceed-to-checkout-modal-window-billing-details-form-delivery__zip-code"
                        type="text"
                        name="delivery-zip-code"
                        placeholder="Zip code"
                        required
                      />
                    </div>
                  </div>

                  <div
                    class="proceed-to-checkout-modal-window-billing-details-form__shipping-method"
                  >
                    <label
                      class="proceed-to-checkout-modal-window-billing-details-form-shipping-method__label"
                      >Shipping Method</label
                    >
                    <div
                      class="proceed-to-checkout-modal-window-billing-details-form-shipping-method__field"
                    >
                      <div
                        class="proceed-to-checkout-modal-window-billing-details-form-shipping-method-field__name"
                      >
                        Standart
                      </div>
                      <div
                        class="proceed-to-checkout-modal-window-billing-details-form-shipping-method-field__price"
                      >
                        $20
                      </div>
                    </div>
                  </div>

                  <div
                    class="proceed-to-checkout-modal-window-billing-details-form__payment"
                  >
                    <label
                      class="proceed-to-checkout-modal-window-billing-details-form-payment__label"
                    >
                      Payment
                    </label>
                    <select
                      class="proceed-to-checkout-modal-window-billing-details-form-payment__transactions"
                      name= 'payment'
                    >
                      <option value="cash upon receipt">
                        Cash upon receipt
                      </option>
                      <option value="credit card">Credit card</option>
                      <option value="e-wallet">E-wallet</option>
                    </select>
                  </div>
                </form>
              </div>

              <!--Order Summary-->

             
              <div
                class="shopping-cart-products-proceed-to-checkout-modal-window__order-summary"
              >
                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__title"
                >
                  Order Summary
                </div>
                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__product"
                >
                  Products:
                </div>

                <!--Order Summmary list-->

                <ul
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__list"
                ></ul>

                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__subtotal"
                >
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-subtotal__text"
                  >
                    Subtotal
                  </div>
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-subtotal__price"
                  >
                    
                  </div>
                </div>

                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__shipping"
                >
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-shipping__text"
                  >
                    Shipping
                  </div>
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-shipping__price"
                  >
                    $20
                  </div>
                </div>

                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__vat"
                >
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-vat__text"
                  >
                    Vat
                  </div>
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-vat__price"
                  >
                    $0
                  </div>
                </div>

                <div
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__total"
                >
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-total__text"
                  >
                    Total
                  </div>
                  <div
                    class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary-total__price"
                  >
                    
                  </div>
                </div>

                <button
                  class="shopping-cart-products-proceed-to-checkout-modal-window-order-summary__place-order-btn"
                >
                  Place Order
                </button>

                <div class = 'shopping-cart-products-proceed-to-checkout-modal-window-order-summary__loader'></div>

              </div>
            </div>
`;

export default shoppingCartProductProceedCheckoutModalWindowTemplate;
