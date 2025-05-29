const ProductService = require("../services/ProductService");
const { sendJson, sendError404 } = require("../utils/response");
const { getBody } = require("../utils/getBody");
const { validateProduct } = require("../validators/validateProduct");

const productService = new ProductService();

class ProductController {
  getAllProducts(res) {
    return sendJson(res, 200, productService.getAllProducts());
  }

  findProductById(res, id) {
    const product = productService.findProductById(id);
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

      return sendJson(res, 201, body);
    } catch (error) {
      return sendJson(res, 400, { error: "Invalid JSON in request body" });
    }
  }

  async updateProduct(req, res, id) {
    const product = productService.findProductById(id);
    if (!product) return sendError404(res, `Product with id ${id} not found`);

    try {
      const body = await getBody(req, id);

      const errors = validateProduct(body);

      if (errors.length > 0) {
        return sendJson(res, 400, { errors });
      }

      return sendJson(res, 200, body);
    } catch (error) {
      return sendJson(res, 400, { error: "Invalid JSON in request body" });
    }
  }

  deleteProduct(res, id) {
    const product = productService.findProductById(id);
    if (!product) return sendError404(res, `Product with id ${id} not found`);

    return sendJson(res, 200, { response: `Product with id ${id} deleted` });
  }
}

module.exports = ProductController;
