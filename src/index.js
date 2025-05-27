require("dotenv").config();

const http = require("node:http");
const { productsRouter } = require("./routes/products");

const port = process.env.PORT ?? 1234;

const server = http.createServer(productsRouter);

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
