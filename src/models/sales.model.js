const connection = require('./connection');

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );
  return insertId;
};

module.exports = {
  insertNewSale,
};