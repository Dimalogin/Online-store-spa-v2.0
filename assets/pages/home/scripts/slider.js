export default class MainSliderWrapper {
  #sliderWrapperArrowPrev = null;
  #sliderWrapperArrowNext = null;
  #slidesWrapperList = null;
  #slidesWrapperSlide = null;

  slideIndex = 0;

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.#initTemplate();
      this.#bindListener();
      this.#showSlides();
    });
  }

  #initTemplate() {
    this.#sliderWrapperArrowPrev = document.querySelector(
      ".slider-wrapper__arrow--prev"
    );
    this.#sliderWrapperArrowNext = document.querySelector(
      ".slider-wrapper__arrow--next"
    );
    this.#slidesWrapperList = document.querySelector(".slides-wrapper__list");
    this.#slidesWrapperSlide = document.querySelector(".slides-wrapper__slide");
  }

  #bindListener() {}

  #showSlides() {
    const slideWidth = this.#slidesWrapperSlide.clientWidth;
    this.#slidesWrapperList.scrollLeft += slideWidth;

    this.slideIndex++;

    if (this.slideIndex === 4) {
      this.slideIndex = 0;
      this.#slidesWrapperList.scrollLeft = 0;
    }

    setTimeout(this.#showSlides.bind(this), 3000);
  }

  #switchSlideToNext() {
    const slideWidth = this.#slidesWrapperSlide.clientWidth;
    this.#slidesWrapperList.scrollLeft += slideWidth;
    this.slideIndex++;
  }

  #switchSlideToPrev() {
    this.slideIndex--;
    const slideWidth = this.#slidesWrapperSlide.clientWidth;
    this.#slidesWrapperList.scrollLeft -= slideWidth;
  }
}
