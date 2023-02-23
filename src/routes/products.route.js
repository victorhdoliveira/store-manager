const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/search', productController.searchProductByName);

router.get('/', productController.getAllProduct);

router.get('/:id', productController.getProductById);

router.post('/', validateName, productController.insertProduct);

router.put('/:id', validateName, productController.updateProduct);

router.delete('/:id', productController.deleteProductById);

module.exports = router;
