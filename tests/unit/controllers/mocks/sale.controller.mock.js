const sucessSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    },
  ]
};


const allSales = [
  {
    "saleId": 1,
    "date": "2023-02-16T22:42:27.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-16T22:42:27.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-16T22:42:27.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const saleId2 = [
  {
    "date": "2023-02-16T22:42:27.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const notFoundError = { type: 'NOT_FOUND', message: 'Product not found' };

module.exports = {
  sucessSale,
  allSales,
  saleId2,
  notFoundError
};