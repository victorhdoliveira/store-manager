const { idSchema, quantitySchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'id must be a number' };
  
  return { type: null, message: '' };
};

const validateQtd = (qtd) => {
  const { error } = quantitySchema.validate(qtd);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateQtd,
};