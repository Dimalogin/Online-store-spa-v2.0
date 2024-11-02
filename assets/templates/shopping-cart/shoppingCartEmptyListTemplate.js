const shoppingCartEmptyListTemplate = document.createElement("template");

shoppingCartEmptyListTemplate.innerHTML = `
    <div class="shopping-cart-products__empty-page">
                <div class="shopping-cart-products-empty-page__content">
                  <img
                    class="shopping-cart-products-empty-page-content__icon"
                    src="./assets/images/shopping-cart/shopping-cart-basket.svg"
                    alt="cart"
                  />
                  <div class="shopping-cart-products-empty-page-content__text">
                    No products in the cart
                  </div>
                </div>
                <div class="shopping-cart-products-empty-page__loader"></div>
              </div>
`;

export default shoppingCartEmptyListTemplate;
