import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  products = null;
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#createProductGrid();
  }

  #createCards(products) {
    return products.map(product => {
            let productCard = new ProductCard(product);
            return productCard.elem.outerHTML;
          }).join('')
  }

  #createProductGrid() {
    let productGrid = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        ${this.#createCards(this.products)}
      </div>
    </div>
    `);

    return productGrid;
  }

  #mergeFilters(newFilter) {
    for (let item in newFilter) {
      if (this.filters[item] === undefined || this.filters[item] != newFilter[item]) {
        this.filters[item] = newFilter[item];
      }
    }
  }

  updateFilter(filters) {
    let filteredCards = this.products;

    this.#mergeFilters(filters);
    
    if (this.filters.noNuts) {
      filteredCards = filteredCards.filter(product => product.nuts == false || product.nuts == undefined);
    }

    if (this.filters.vegeterianOnly) {
      filteredCards = filteredCards.filter(product => product.vegeterian == true);
    }

    if (this.filters.maxSpiciness) {
      filteredCards = filteredCards.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }

    if ( !(this.filters.category == '' || this.filters.category == undefined) ) {
      filteredCards = filteredCards.filter(product => product.category == this.filters.category);
    }

    document.querySelector('.products-grid__inner').innerHTML = this.#createCards(filteredCards);
  }
}
