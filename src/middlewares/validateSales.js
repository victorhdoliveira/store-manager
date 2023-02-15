module.exports = (req, res, next) => {
  const sales = req.body;
  const validatedProductId = sales.every(({ productId }) => productId);
  const validatedQuantity = sales.every(({ quantity }) => quantity);
  const validatedQuantityNumber = sales.every(({ quantity }) => quantity >= 1);

  if (!validatedProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!validatedQuantity) {
     return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!validatedQuantityNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};