const handlerFunction = require('../controllers/handlerFunction');
const Category = require('../models/Category');

exports.createCategory = handlerFunction.createDocument(Category);
exports.getAllCategory = handlerFunction.getAllDocuments(Category);
exports.updateCategory = handlerFunction.updateDocument(Category);
exports.getCategory = handlerFunction.getDocument(Category);
exports.deleteCategory = handlerFunction.deleteDocument(Category);
