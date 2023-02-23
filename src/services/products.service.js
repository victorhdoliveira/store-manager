const { productModel } = require('../models');
const schema = require('./validations/validations');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const productById = await productModel.findById(productId);
  if (!productById) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: productById };
};

const newProduct = async (name) => {
  const insertProduct = await productModel.insertNewProduct(name);
  if (!insertProduct) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: insertProduct };
};

const updateProductById = async (name, id) => {
  const updateProduct = await productModel.updateProduct(name, id);
  if (!updateProduct) return { type: 'NOT_FOUND', message: 'Product not found' };
 
  return { type: null, message: updateProduct };
};

const deleteProductById = async (id) => {
  const productById = await productModel.findById(id);
  if (!productById) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  await productModel.deleteProduct(id);

  return { type: null, message: '' };
};

const searchProduct = async (search) => {
  const allProducts = await productModel.findAll();
  const filtering = allProducts.filter((product) => product.name.includes(search));

  return { type: null, message: filtering };
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProductById,
  deleteProductById,
  searchProduct,
};