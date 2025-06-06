const { pool } = require("../database/connection");

class ProductService {
  constructor() {}

  async getAllProducts() {
    const [results] = await pool.query("SELECT * FROM product");
    return results;
  }

  async findProductById(id) {
    const [result] = await pool.query("SELECT * FROM product WHERE id = ?", [
      id,
    ]);
    return result[0];
  }

  async createProduct(body) {
    const { name, description } = body;
    const [result] = await pool.query(
      "INSERT INTO product (name, description) VALUES (?, ?)",
      [name, description]
    );
    return {
      id: result.insertId,
      name,
      description,
    };
  }

  async updatePartialProduct(id, body) {
    const fields = [];
    const values = [];

    if (body.name !== undefined) {
      fields.push("name = ?");
      values.push(body.name);
    }

    if (body.description !== undefined) {
      fields.push("description = ?");
      values.push(body.description);
    }

    if (fields.length === 0) {
      return await this.findProductById(id);
    }

    const query = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    await pool.query(query, values);

    const updatedProduct = await this.findProductById(id);
    return updatedProduct;
  }

  async updateProduct(id, body) {
    const { name, description } = body;
    await pool.query(
      "UPDATE product SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    return {
      id,
      name,
      description,
    };
  }

  async deleteProduct(id) {
    await pool.query("DELETE FROM product WHERE id = ?", [id]);
    return [];
  }
}

module.exports = ProductService;
