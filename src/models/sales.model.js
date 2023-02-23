const camelize = require('camelize');
const connection = require('./connection');

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );
  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity
    FROM sales AS s
    INNER JOIN sales_products AS p 
    ON s.id = p.sale_id
    ORDER BY p.sale_id, p.product_id;`,
  );
  return camelize(result);
};

const findById = async (salesId) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity
    FROM sales AS s
    INNER JOIN sales_products AS p 
    ON s.id = p.sale_id
    WHERE s.id = ? 
    ORDER BY p.sale_id, p.product_id;`,
    [salesId],
  );
  return camelize(result);
};

const deleteSale = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM sales
    WHERE id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  insertNewSale,
  findAll,
  findById,
  deleteSale,
};