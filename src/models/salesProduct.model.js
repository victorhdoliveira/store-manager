const connection = require('./connection');

const insertNewSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  insertNewSaleProduct,
};