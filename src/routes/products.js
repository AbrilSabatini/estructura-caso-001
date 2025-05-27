const data = require("./../data/products.json");
const { sendJson } = require("../utils/response");

const productsRouter = (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");

  // GET
  if (method === "GET") {
    if (url === "/product") {
      // GET ALL
      return sendJson(res, 200, data);
    }

    // GET BY ID
    if (url.startsWith("/product/")) {
      const id = parseInt(url.split("/")[2]); // Get id
      const product = data.find((p) => p.id === id);

      if (!product) {
        return sendJson(res, 404, { error: `Product with id ${id} not found` });
      }

      return sendJson(res, 200, product);
    }
  }

  return sendJson(res, 404, { error: "Page Not Found" });
};

module.exports = { productsRouter };
