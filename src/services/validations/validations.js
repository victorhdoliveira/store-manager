const { idSchema, saleSchema } = require('./schemas');
const { productsId } = require('../../utils/hasProduct');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'id must be a number' };
  
  return { type: null, message: '' };
};

const validateNewSale = (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};

const validateProduct = async (items) => {
  const allSalesId = await productsId();
  const validate = items.every(({ productId }) => allSalesId.includes(productId));
  if (!validate) return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  validateId,
  validateNewSale,
  validateProduct,
};