const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.getAllProduct);

router.get('/:id', productController.getProductById);

router.post('/', validateName, productController.insertProduct);

module.exports = router;
