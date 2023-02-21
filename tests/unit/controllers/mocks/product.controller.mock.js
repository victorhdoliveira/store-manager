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
  
const newProduct = {
  "id": 4,
  "name": "ProdutoX"
}

const notFoundError = { type: 'NOT_FOUND', message: 'Product not found' };

  module.exports = {
  products,
  oneProduct,
  newProduct,
  notFoundError
}