const { productModel } = require('../models');

const productsId = async () => {
  const products = await productModel.findAll();
  const getProductId = products.map((product) => product.id);
  return getProductId;
};

module.exports = {
  productsId,
};