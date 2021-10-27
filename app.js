const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorHandler');

const app = express();
app.use(express.json());
dotenv.config({});
require('./config/dbconfig')();

app.use('/api/v1/categories', categoryRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(404, 'This route is not yet defined'));
});

app.use(errorHandler);

module.exports = app;
