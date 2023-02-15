const express = require('express');
const { saleController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, saleController.insertProduct);

module.exports = router;