const ProductService = require("../services/ProductService");
const { sendJson, sendError404 } = require("../utils/response");
const { getBody } = require("../utils/getBody");
const { validateProduct } = require("../validators/validateProduct");

const productService = new ProductService();

class ProductController {
  async getAllProducts(res) {
    const products = await productService.getAllProducts();
    return sendJson(res, 200, products);
  }

  async findProductById(res, id) {
    const product = await productService.findProductById(id);
    console.log(product);
    if (!product) return sendError404(res, `Product with id ${id} not found`);

    return sendJson(res, 200, product);
  }

  async createProduct(req, res) {
    try {
      const body = await getBody(req);

      const errors = validateProduct(body);

      if (errors.length > 0) {
        return sendJson(res, 400, { errors });
      }

      const newProduct = await productService.createProduct(body);

      return sendJson(res, 201, newProduct);
    } catch (error) {
      console.log(error);
      return sendJson(res, 400, { error: "Invalid JSON in request body" });
    }
  }

  async updateProduct(req, res, id) {
    const product = await productService.findProductById(id);
    if (!product) return sendError404(res, `Product with id ${id} not found`);

    try {
      const body = await getBody(req, id);

      const errors = validateProduct(body);

      if (errors.length > 0) {
        return sendJson(res, 400, { errors });
      }

      const updatedProduct = await productService.updateProduct(id, body);

      return sendJson(res, 200, updatedProduct);
    } catch (error) {
      return sendJson(res, 400, { error: "Invalid JSON in request body" });
    }
  }

  async deleteProduct(res, id) {
    const product = await productService.findProductById(id);

    if (!product) return sendError404(res, `Product with id ${id} not found`);

    await productService.deleteProduct(id);

    return sendJson(res, 200, { response: `Product with id ${id} deleted` });
  }
}

module.exports = ProductController;
