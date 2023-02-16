module.exports = (req, res, next) => {
  const sales = req.body;
  
  const validatedProductId = sales.some(({ productId }) => !productId);
  const validatedQuantity = sales.some(({ quantity }) => !quantity);
  const validatedQuantityNumber = sales.some(({ quantity }) => quantity <= 0);

  if (validatedProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (validatedQuantityNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (validatedQuantity) {
     return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};