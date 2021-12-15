import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || product === undefined) return;

    let itemIndex = this.cartItems.findIndex(item => item.product.id == product.id);
    
    if (itemIndex == -1) {
      this.cartItems.push({product, count: 1});
    } else {
      this.cartItems[itemIndex].count += 1;
    }

    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  updateProductCount(productId, amount) {
    let itemIndex = this.cartItems.findIndex(item => item.product.id == productId);
    let modifiedItem = this.cartItems[itemIndex];
    
    if (amount == 1) {
      modifiedItem.count += 1;
    } else if (amount == -1) {
      modifiedItem.count -= 1;
    }

    if (modifiedItem.count == 0) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.onProductUpdate(modifiedItem);
  }

  isEmpty() {
    return this.cartItems.length == 0 ? true : false;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.modal.setTitle('Your order');

    let modalBody = document.createElement('div');
    modalBody.innerHTML = `
      ${this.cartItems.map(item => this.renderProduct(item.product, item.count).outerHTML).join('')}
      ${this.renderOrderForm().outerHTML}
    `;
    this.modal.setBody(modalBody);

    this.modal.open();

    document.querySelector('.modal__body').firstElementChild.addEventListener('click', event => {
      let target = event.target;
      let productTarget = target.closest('.cart-product');

      if (target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productTarget.dataset.productId, -1);
      } else if (target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productTarget.dataset.productId, 1);
      }
    });

    document.querySelector('.cart-form').addEventListener('submit', event => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return;

    let productId = cartItem.product.id;
    let modalBody = document.querySelector('.modal__body');
    let productElement = modalBody.querySelector(`[data-product-id="${productId}"]`);
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    if (cartItem.count == 0) {
      productElement.remove();
    } else {
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }

    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    if (this.isEmpty()) this.modal.close();
  }

  onSubmit(event) {
    event.preventDefault();

    document.querySelector('[type="submit"]').classList.add('is-loading');

    let form = document.querySelector('.cart-form');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(() => {
        this.modal.setTitle('Success!');

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal__body-inner');
        modalBody.innerHTML = `
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        `;
        this.modal.setBody(modalBody);

        this.cartItems.length = 0;

        this.cartIcon.update(this);
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

