const products = [
  {
    id: 1,
    name: 'Martelo de Thor'
  },
  {
    id: 2,
    name: 'Traje de encolhimento'
  },
  {
    id: 3,
    name: 'Escudo do Capitão América'
  },
];

const oneProduct = {
    id: 1,
    name: 'Martelo de Thor'
  }

const idNotFoundError = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

const idNotNumberError = { type: 'INVALID_VALUE', message: 'id must be a number' };

module.exports = {
  products,
  oneProduct,
  idNotFoundError,
  idNotNumberError
}