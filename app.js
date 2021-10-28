const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorHandler');
const ratelimiter = require('express-rate-limit');
const helemt = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(express.json());
dotenv.config({});
app.use(mongoSanitize());
app.use(helemt());
require('./config/dbconfig')();

const limiter = ratelimiter({
  max: 4,
  windowMs: 60 * 60 * 1000,
  message: 'So many request attempt from this IP addresss',
});

//@ Login attempt prevented using express limiter
app.use('/api/v1/users/login', limiter);

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(404, 'This route is not yet defined'));
});

app.use(errorHandler);

module.exports = app;
