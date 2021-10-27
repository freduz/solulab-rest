const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Please provide the category name'],
    unique: true,
  },
});

categorySchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

module.exports = mongoose.model('Category', categorySchema);
