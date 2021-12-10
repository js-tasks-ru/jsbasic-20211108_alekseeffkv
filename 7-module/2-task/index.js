import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.#createModal();
  }

  #createModal() {
    let modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>
    </div>
    `);

    return modal;
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(modalBody) {
    this.elem.querySelector('.modal__body').innerHTML = modalBody.outerHTML;
  }

  open() {
    document.body.prepend(this.elem);

    document.body.classList.add('is-modal-open');

    document.querySelector('.modal__close').addEventListener('click', this.close);

    document.onkeydown = event => {
      if (event.code === 'Escape') this.close();
    };
  }

  close() {
    if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
    
    document.body.classList.remove('is-modal-open');

    document.onkeydown = null;
    }
  }
}
