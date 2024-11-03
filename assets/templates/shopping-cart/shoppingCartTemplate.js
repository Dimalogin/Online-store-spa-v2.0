const shoppingCartTemplate = document.createElement("template");

shoppingCartTemplate.innerHTML = `
<div class="shopping-cart-products__content">
                <div class="shopping-cart-products__shopping-list">
                  <ul class="shopping-cart-products__list">
                  
                  </ul>
                  <div class = 'shopping-cart-products-list__loader'></div>
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

export default shoppingCartTemplate;
