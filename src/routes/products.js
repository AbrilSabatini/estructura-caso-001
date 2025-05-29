const data = require("./../data/products.json");
const { sendJson, sendError404 } = require("../utils/response");
const { getIdFromUrl } = require("../utils/getIdFromUrl");

const findProductById = (id) => {
  return data.find((p) => p.id === id) || null;
};

const getBody = (req, id) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        data.id = id ?? 9;
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};

const productsRouter = async (req, res) => {
  const { method, url } = req;

  // GET
  if (method === "GET") {
    // Get all
    if (url === "/") {
      return sendJson(res, 200, data);
    }

    // Get by id
    const id = getIdFromUrl(url);
    if (id !== null) {
      const product = findProductById(id);
      if (!product) return sendError404(res, `Product with id ${id} not found`);

      return sendJson(res, 200, product);
    }

    // Page not found
    return sendError404(res);
  }

  if (method === "POST") {
    if (url === "/") {
      try {
        const body = await getBody(req);
        return sendJson(res, 201, body);
      } catch (error) {
        return sendJson(res, 400, { error: "Invalid JSON in request body" });
      }
    }
    return sendError404(res);
  }

  if (method === "PUT" || method === "PATCH") {
    const id = getIdFromUrl(url);
    if (id !== null) {
      const product = findProductById(id);
      if (!product) return sendError404(res, `Product with id ${id} not found`);

      try {
        const body = await getBody(req, id);
        return sendJson(res, 200, body);
      } catch (error) {
        return sendJson(res, 400, { error: "Invalid JSON in request body" });
      }
    }
    return sendError404(res);
  }

  if (method === "DELETE") {
    const id = getIdFromUrl(url);
    if (id !== null) {
      const product = findProductById(id);
      if (!product) return sendError404(res, `Product with id ${id} not found`);

      return sendJson(res, 200, { response: `Product with id ${id} deleted` });
    }
    return sendError404(res);
  }

  // Page not found
  return sendError404(res);
};

module.exports = { productsRouter };
