const shoppingCartOrderTemplate = document.querySelector("template");
shoppingCartOrderTemplate.innerHTML = `
  <div class="shopping-cart-products__order-page">
                <div class="shopping-cart-products-order-page__content">
                  <img
                    class="shopping-cart-products-order-page-content__icon"
                    src="./assets/images/shopping-cart/shopping-cart-check-mark.svg"
                    alt="check-mark"
                  />
                  <div class="shopping-cart-products-order-page-content__text">
                    Your order number is
                    <b
                      class="shopping-cart-products-order-page-content__text--order-number"
                      ></b
                    >, our manager will contact you.
                  </div>
                </div>
                <div class="shopping-cart-products__loader"></div>
              </div>
`;

export default shoppingCartOrderTemplate;
