const express = require('express');
const { saleController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSalesById);

router.post('/', validateSales, saleController.insertSale);

router.delete('/:id', saleController.deleteSaleById);

router.put('/:id', validateSales, saleController.updateSale);

module.exports = router;