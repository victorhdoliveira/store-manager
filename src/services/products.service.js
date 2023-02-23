const { productModel } = require('../models');
const schema = require('./validations/validations');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const newProduct = async (name) => {
  const product = await productModel.insertNewProduct(name);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};

const updateProductById = async (name, id) => {
  const product = await productModel.updateProduct(name, id);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
 
  return { type: null, message: product };
};

const deleteProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  await productModel.deleteProduct(id);

  return { type: null, message: '' };
};

const searchProduct = async (search) => {
  const allProducts = await productModel.findAll();
  const filtering = allProducts.filter((product) => product.name.includes(search));

  if (!allProducts) return allProducts;

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