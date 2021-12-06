import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = [];
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#createCarousel();
  }

  #slideTemplate(slide) {
    return `
    <div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;
  }

  #initCarousel(carouselElement) {
    let carousel = carouselElement;
    let slides = carouselElement.querySelector('.carousel__inner');
    let arrowRight = carouselElement.querySelector('.carousel__arrow_right');
    let arrowLeft = carouselElement.querySelector('.carousel__arrow_left');
    let position = 0;
  
    arrowLeft.style.display = 'none';
  
    carousel.addEventListener('click', event => {
      let slideWidth = carouselElement.querySelector('.carousel__slide').offsetWidth;
      let target = event.target.closest('div');
  
      if (target == arrowRight) {
        position -= slideWidth;
      } else if (target == arrowLeft) {
        position += slideWidth;
      }
  
      slides.style.transform = `translateX(${position}px)`;
      
      if (position == 0) {
        arrowLeft.style.display = 'none';
      } else if (position == -(this.slides.length - 1) * slideWidth) {
        arrowRight.style.display = 'none';
      } else {
        arrowLeft.style.display = 'flex';
        arrowRight.style.display = 'flex';
      }

      if (event.target.classList.contains("carousel__button")) {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
      }
    });
  }

  #createCarousel() {
    let carousel = createElement(`
    <div class="carousel">

      <div class="carousel__arrow carousel__arrow_right">
       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
       <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
       ${this.slides.map(this.#slideTemplate).join('')}
      </div>

    </div>
    `);

    this.#initCarousel(carousel);

    return carousel;
  }
}
