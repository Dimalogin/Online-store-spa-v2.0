const womanDressesProductsTemplate = document.createElement("template");

womanDressesProductsTemplate.innerHTML = `
 <li class="woman-dresses-products__column">
                  <div class="woman-dresses-products__item">
                    <div class="woman-dresses-products__icon">
                      <img
                        src="../../assets/images/products/for-woman/dresses/woman-dress-1.png"
                        alt=""
                      />
                    </div>
                    <div class="woman-dresses-products__title">
                      Lorem ipsum dolor sit amet
                    </div>
                    <div
                      class="woman-dresses-products__price woman-dresses-products-price"
                    >
                      <div class="woman-dresses-products-price__new-price">
                        $450
                      </div>
                      <div class="woman-dresses-products-price__old-price">
                        $555
                      </div>
                    </div>

                    <div class="woman-dresses-products__heart">
                      <img
                        src="../../assets/images/products/for-woman/dresses/dresses-product-heart.svg"
                        alt="heart"
                      />
                    </div>
                    <div class="woman-dresses-products__sale">Sale!</div>
                    <div
                      class="woman-dresses-products__select-option woman-dresses-products-select-option"
                    >
                      <button class="woman-dresses-products-select-option__btn">
                        Select options
                      </button>
                    </div>
                  </div>
                </li>
`;

export default womanDressesProductsTemplate;
