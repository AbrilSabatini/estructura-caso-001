class ProductService {
  constructor() {
    this.data = require("../data/products.json");
  }

  findProductById(id) {
    return this.data.find((p) => p.id === id) || null;
  }

  getAllProducts() {
    return this.data;
  }
}

module.exports = ProductService;
