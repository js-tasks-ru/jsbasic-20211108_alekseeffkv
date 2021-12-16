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
    let productContainer = createElement(`
      <div class="products-grid__inner">
      </div>
    `);

    products.map( product => {
      let productCard = new ProductCard(product);
      productContainer.append(productCard.elem);
    });

    return productContainer;
  }

  #createProductGrid() {
    let productGrid = createElement(`
      <div class="products-grid">
      </div>
    `);

    productGrid.append( this.#createCards(this.products) );

    return productGrid;
  }

  updateFilter(newFilter) {
    let filteredCards = this.products;

    this.filters = {...this.filters, ...newFilter};
    
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

    this.elem.querySelector('.products-grid__inner').remove();

    this.elem.append( this.#createCards(filteredCards) );
  }
}
