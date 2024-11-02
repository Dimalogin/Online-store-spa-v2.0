const shoppingCartListTemplate = document.createElement("template");

shoppingCartListTemplate.innerHTML = `
<div class="shopping-cart-products__content">
                <div class="shopping-cart-products__shopping-list">
                  <ul class="shopping-cart-products__list">
                    <li class="shopping-cart-products__item">
                      <div class="shopping-cart-products__top">
                        <img
                          class="shopping-cart-products__icon"
                          src="./assets/images/products/for-woman/dresses/woman-dress-1.png"
                          alt="icon"
                        />
                        <div class="shopping-cart-products__info">
                          <div class="shopping-cart-products-info__title">
                            Lorem ipsum, dolor sit amet consectetur
                          </div>
                          <div class="shopping-cart-products-info__color">
                            <span
                              class="shopping-cart-products-info-color__text"
                              >Color:</span
                            >
                            <span
                              class="shopping-cart-products-info-color__value"
                              >black</span
                            >
                          </div>
                          <div class="shopping-cart-products-info__size">
                            <span class="shopping-cart-products-info-size__text"
                              >Size:</span
                            >
                            <span
                              class="shopping-cart-products-info-size__value"
                              >L</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="shopping-cart-products__bottom">
                        <div class="shopping-cart-products__quantity">
                          <button
                            class="shopping-cart-products-quantity__minus"
                          >
                            <img
                              src="./assets/images/shopping-cart/shopping-cart-minus-product.svg"
                              alt="minus"
                            />
                          </button>
                          <span class="shopping-cart-products-quantity__value"
                            >1</span
                          >
                          <button class="shopping-cart-products-quantity__plus">
                            <img
                              src="./assets/images/shopping-cart/shopping-cart-plus-product.svg"
                              alt="plus"
                            />
                          </button>
                        </div>
                        <div class="shopping-cart-products__price">$455</div>
                      </div>
                      <button class="shopping-cart-products__delete-btn">
                        <img
                          src="./assets/images/shopping-cart/shopping-cart-delete.svg"
                          alt=""
                        />
                      </button>
                    </li>
                  </ul>
                  <div
                    class="shopping-cart-products-shopping-list__loader"
                  ></div>
                </div>
                <div class="shopping-cart-products__total">
                  <div class="shopping-cart-products-total__subtotal">
                    <div class="shopping-cart-products-total-subtotal__text">
                      Total
                    </div>
                    <div class="shopping-cart-products-total-subtotal__price">
                      $0
                    </div>
                  </div>
                  <div class="shopping-cart-products-total__vat">
                    <div class="shopping-cart-products-total-vat__text">
                      Vat
                    </div>
                    <div class="shopping-cart-products-total-vat__price">
                      $0
                    </div>
                  </div>
                  <button
                    class="shopping-cart-products-total__proceed-to-checkout"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
`;

export default shoppingCartListTemplate;
