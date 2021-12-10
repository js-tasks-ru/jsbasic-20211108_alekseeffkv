import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  categories = [];
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.elem = this.#createMenu();
  }

  #linkTemplate(category) {
    return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
  }

  #initMenu(menuElement) {
    let menu = menuElement;
    let ribbon = menuElement.querySelector('.ribbon__inner');
    let arrowRight = menuElement.querySelector('.ribbon__arrow_right');
    let arrowLeft = menuElement.querySelector('.ribbon__arrow_left');
    let previousLink;
  
    menu.addEventListener('click', event => {
      let target = event.target.closest('button');

      if (target == arrowRight) {
        ribbon.scrollBy(350, 0);
      } else if (target == arrowLeft) {
        ribbon.scrollBy(-350, 0);
      }

      if (event.target.classList.contains("ribbon__item")) {
        event.preventDefault();

        !previousLink || previousLink.classList.remove("ribbon__item_active");
        event.target.classList.add("ribbon__item_active");
        previousLink = event.target;

        this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true
        }));
      }
    });

    ribbon.addEventListener('scroll', () => {
      let scrollRight = ribbon.scrollWidth - ribbon.scrollLeft - ribbon.clientWidth;

      if (ribbon.scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  #createMenu() {
    let menu = createElement(`
    <div class="ribbon">

      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this.categories.map(this.#linkTemplate).join('')}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `)

    this.#initMenu(menu);

    return menu;
  }
}
