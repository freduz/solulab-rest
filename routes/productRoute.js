const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/')
  .post(
    authController.hasAuthenticated,
    // authController.hasModuleAccess('admin'),
    productController.createProduct
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .delete(
    authController.hasAuthenticated,
    authController.hasModuleAccess('admin'),
    productController.deleteProduct
  )
  .patch(
    authController.hasAuthenticated,
    authController.hasModuleAccess('admin'),
    productController.updateProduct
  );

module.exports = router;
