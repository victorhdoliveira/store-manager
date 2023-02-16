const { saleModel, saleProductModel } = require('../models');
const schema = require('./validations/validations');
const { productsId } = require('../utils/hasProduct');

const newSale = async (itemsSold) => {
  const error = await schema.validateNewSale(itemsSold);
  if (error.type) return error;
  
  const allSalesId = await productsId();
  const validate = itemsSold.every(({ productId }) => allSalesId.includes(productId));
  if (!validate) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const id = await saleModel.insertNewSale();
  await Promise.all(itemsSold.map((item) => saleProductModel
    .insertNewSaleProduct(id, item.productId, item.quantity)));
  
  return { type: null, message: { id, itemsSold } };
};

module.exports = {
  newSale,
};