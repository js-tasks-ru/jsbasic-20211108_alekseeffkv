import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = null;
  #value = null;
  #valuePercents = null;
  #leftPercents = null;
  #previousPosition = null;
  #thumb = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#valuePercents = this.#value / (this.#steps - 1) * 100;
    this.elem = this.#createSlider();
  }

  #stepTemplate() {
    let steps = '';
    for (let i = 0; i < this.#steps; i++) {
      steps += `<span></span>`;
    }
    return steps;
  }

  #calculatePosition(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let approximateValue = leftRelative * (this.#steps - 1);

    this.#value = Math.round(approximateValue);
    this.#valuePercents = this.#value / (this.#steps - 1) * 100;
    this.#leftPercents = leftRelative * 100;
  }

  #changePosition(slider, position) {
    slider.querySelector('.slider__value').textContent = this.#value;

    !this.#previousPosition || this.#previousPosition.classList.remove('slider__step-active');
    slider.querySelector(`.slider__steps span:nth-child(${this.#value +1})`).classList.add('slider__step-active');
    this.#previousPosition = slider.querySelector(`.slider__steps span:nth-child(${this.#value +1})`);

    slider.querySelector('.slider__thumb').style.left = `${position}%`;

    slider.querySelector('.slider__progress').style.width = `${position}%`;
  }

  #moveSlider = event => {
    //this.#thumb.setPointerCapture(event.pointerId);

    this.elem.classList.add('slider_dragging');

    this.#calculatePosition(event);
    this.#changePosition(this.elem, this.#leftPercents);

    document.onpointermove = event => {
      this.#calculatePosition(event);
      this.#changePosition(this.elem, this.#leftPercents);
    }

    document.onpointerup = event => {
      this.#calculatePosition(event);
      this.#changePosition(this.elem, this.#valuePercents);

      this.elem.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.#value,
        bubbles: true
      }));

      this.elem.classList.remove('slider_dragging');

      document.onpointermove = null;
      document.onpointerup = null;
    }
  }

  #clickSider = event => {
    this.#calculatePosition(event);
    this.#changePosition(this.elem, this.#valuePercents);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.#value,
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

    this.#changePosition(slider, this.#valuePercents);

    this.#thumb = slider.querySelector('.slider__thumb');

    this.#thumb.addEventListener('pointerdown', this.#moveSlider);
    slider.addEventListener('click', this.#clickSider);
    slider.ondragstart = () => false;

    slider.style.touchAction = 'none';

    return slider;
  }
}
