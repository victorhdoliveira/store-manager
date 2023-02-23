const { saleModel } = require('../models');
const schema = require('./validations/validations');

const newSale = async (itemsSold) => {
  const error = await schema.validateNewSale(itemsSold);
  if (error.type) return error;

  const hasProductId = await schema.validateProduct(itemsSold);
  if (hasProductId) return hasProductId;
  
  const id = await saleModel.insertNewSale();
  await Promise.all(itemsSold.map((item) => saleModel
    .insertNewSaleProduct(id, item.productId, item.quantity)));
  
  return { type: null, message: { id, itemsSold } };
};

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (!sale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteSaleById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (!sale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };
  
  await saleModel.deleteSale(saleId);
  return { type: null, message: '' };
};

const updateSale = async (saleId, itemsUpdated) => {
  const hasProductId = await schema.validateProduct(itemsUpdated);
  if (hasProductId) return hasProductId;

  const sale = await saleModel.findById(saleId);
  if (!sale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };

  await Promise.all(itemsUpdated.map((item) => saleModel
    .updateSale(saleId, item.productId, item.quantity)));
  
  return { type: null, message: { saleId, itemsUpdated } };
};

module.exports = {
  newSale,
  findAll,
  findById,
  deleteSaleById,
  updateSale,
};