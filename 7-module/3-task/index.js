import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = null;
  #value = null;
  #previousPosition = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.elem = this.#createSlider();
  }

  #stepTemplate() {
    let steps = '';
    for (let i = 0; i < this.#steps; i++) {
      steps += `<span></span>`;
    }
    return steps;
  }

  #sliderPosition(slider, value) {
    let valuePercents = value / (this.#steps - 1) * 100;

    slider.querySelector('.slider__value').textContent = value;

    !this.#previousPosition || this.#previousPosition.classList.remove('slider__step-active');
    slider.querySelector(`.slider__steps span:nth-child(${value +1})`).classList.add('slider__step-active');
    this.#previousPosition = slider.querySelector(`.slider__steps span:nth-child(${value +1})`);

    slider.querySelector('.slider__thumb').style.left = `${valuePercents}%`;

    slider.querySelector('.slider__progress').style.width = `${valuePercents}%`;
  }

  #onSliderClick = event => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * (this.#steps - 1);
    let value = Math.round(approximateValue);
    
    this.#sliderPosition(this.elem, value);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: value,
      bubbles: true
    }));
  }

  #createSlider() {
    let slider = createElement(`
    <div class="slider">

      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps">
      ${this.#stepTemplate()}
      </div>
    </div>
    `);

    this.#sliderPosition(slider, this.#value);

    slider.addEventListener('click', this.#onSliderClick);

    return slider;
  }
}
