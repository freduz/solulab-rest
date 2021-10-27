const mongoose = require('mongoose');

const prodcutSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please provide the product name'],
  },
  qtyPerUnit: {
    type: Number,
    required: [true, 'Please provide the  Quantity of the Produc'],
  },
  unitPrice: {
    type: Number,
    required: [true, 'Please provide the Unit Price of the Product'],
  },
  unitInStock: {
    type: Number,
    required: [true, 'Please provide the Unit in Stock'],
  },
  discontinued: {
    type: Boolean,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Provide the category'],
  },
});

prodcutSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

module.exports = mongoose.model('Product', prodcutSchema);
