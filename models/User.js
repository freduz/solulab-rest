const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have a email'],
    lowercase: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email address',
    },
  },

  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please provide the confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Both password should be get matched',
    },
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async function (userPassword, passwordHash) {
  return await bcrypt.compare(userPassword, passwordHash);
};

module.exports = mongoose.model('User', userSchema);
