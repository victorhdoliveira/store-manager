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

const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];

const wrongZeroNegativeBody = [{productId:1,quantity:-1}];

module.exports = {
  sucessSale,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody
};