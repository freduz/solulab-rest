const handlerFactory = require('../controllers/handlerFunction');
const Product = require('../models/Product');

exports.createProduct = handlerFactory.createDocument(Product);
exports.getAllProducts = handlerFactory.getAllDocuments(Product, {
  path: 'categoryId',
  select: '-__v',
});
exports.getProduct = handlerFactory.getDocument(Product, {
  path: 'categoryId',
  select: '-__v',
});
exports.deleteProduct = handlerFactory.deleteDocument(Product);
exports.updateProduct = handlerFactory.updateDocument(Product);
