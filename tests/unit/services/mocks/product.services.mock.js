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

const updateProduct = {
  "name": "Martelo do Batman"
}

const removeProduct1 = [
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const idNotFoundError = { type: 'NOT_FOUND', message: 'Product not found' };

const idNotNumberError = { type: 'INVALID_VALUE', message: 'id must be a number' };

module.exports = {
  products,
  oneProduct,
  idNotFoundError,
  idNotNumberError,
  newProduct,
  updateProduct,
  removeProduct1,
}