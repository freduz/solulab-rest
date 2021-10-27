const express = require('express');
const categoryController = require('../controllers/categoryController');
const route = express.Router();

route
  .route('/')
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategory);

route
  .route('/:id')
  .patch(categoryController.updateCategory)
  .get(categoryController.getCategory)
  .delete(categoryController.deleteCategory);

module.exports = route;
