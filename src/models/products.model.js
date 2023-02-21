const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result); 
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const insertNewProduct = async (name) => {
  await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  return result;
};

const updateProduct = async (name, id) => {
  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
   const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insertNewProduct,
  updateProduct,
};