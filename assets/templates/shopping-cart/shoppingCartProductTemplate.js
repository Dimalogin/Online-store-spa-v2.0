const shoppingCartProductTemplate = document.createElement("template");

shoppingCartProductTemplate.innerHTML = `

<li class="shopping-cart-products__item">
<div class="shopping-cart-products__top">
  <img
    class="shopping-cart-products__icon"
    src=""
    alt=""
  />
  <div class="shopping-cart-products__info">
    <div class="shopping-cart-products-info__title">
     
    </div>
    <div class="shopping-cart-products-info__color">
      <span
        class="shopping-cart-products-info-color__text"
        >Color:</span
      >
      <span
        class="shopping-cart-products-info-color__value"
        ></span
      >
    </div>
    <div class="shopping-cart-products-info__size">
      <span class="shopping-cart-products-info-size__text"
        >Size:</span
      >
      <span
        class="shopping-cart-products-info-size__value"
        ></span
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
      ></span
    >
    <button class="shopping-cart-products-quantity__plus">
      <img
        src="./assets/images/shopping-cart/shopping-cart-plus-product.svg"
        alt="plus"
      />
    </button>
  </div>
  
  <div class="shopping-cart-products__price"></div>
</div>
<button class="shopping-cart-products__delete-btn">
  <img
    src="./assets/images/shopping-cart/shopping-cart-delete.svg"
    alt=""
  />
</button>
</li>`;

export default shoppingCartProductTemplate;
