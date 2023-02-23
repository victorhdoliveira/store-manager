const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.newSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

module.exports = {
  insertSale,
  getAllSales,
  getSalesById,
  deleteSaleById,
};