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

const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];

const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];

const idNotFoundError = { type: 'NOT_FOUND', message: 'Sale not found' };


module.exports = {
  sucessSale,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  idNotFoundError,
  allSales,
  saleId2
};