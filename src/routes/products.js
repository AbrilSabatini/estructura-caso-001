const data = require("./../data/products.json");
const { sendJson, sendError404 } = require("../utils/response");

const productsRouter = (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");

  // GET
  if (method === "GET") {
    // Get all
    if (url === "/") {
      return sendJson(res, 200, data);
    }

    // Get by id
    const match = url.match(/^\/(\d+)$/);
    if (match) {
      const id = parseInt(match[1]); // Get id
      const product = data.find((p) => p.id === id);

      if (!product) {
        return sendError404(res, `Product with id ${id} not found`);
      }

      return sendJson(res, 200, product);
    }

    // Page not found
    return sendError404(res);
  }
};

module.exports = { productsRouter };
