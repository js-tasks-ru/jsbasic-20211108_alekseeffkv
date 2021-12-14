export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    
    if (amount == 1) {
      this.cartItems[itemIndex].count += 1;
    } else if (amount == -1) {
      this.cartItems[itemIndex].count -= 1;
    }

    if (this.cartItems[itemIndex].count == 0) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  isEmpty() {
    return this.cartItems.length == 0 ? true : false;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map(item => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map(item => totalPrice += item.count * item.product.price);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

