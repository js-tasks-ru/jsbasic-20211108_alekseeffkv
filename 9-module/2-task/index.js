import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    let stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let json = await response.json();
    let products = JSON.parse(JSON.stringify(json));

    let productsGrid = new ProductsGrid(products);
    let gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = '';
    gridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.body.addEventListener('product-add', event => {
      let addedProduct = products.find(product => product.id == event.detail);
      cart.addProduct(addedProduct);
    });

    stepSlider.elem.addEventListener('slider-change', event => {
      productsGrid.updateFilter({maxSpiciness: event.detail});
    });

    ribbonMenu.elem.addEventListener('ribbon-select', event => {
      productsGrid.updateFilter({category: event.detail});
    });

    document.querySelector('.filters').addEventListener('change', event => {
      let target = event.target;

      if (target.id == 'nuts-checkbox') {
        productsGrid.updateFilter({noNuts: target.checked});
      } else if (target.id == 'vegeterian-checkbox') {
        productsGrid.updateFilter({vegeterianOnly: target.checked});
      }
    });
  }
}
