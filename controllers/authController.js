const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypt = require('crypto');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

const createAndSendJwtToken = (res, statusCode, user) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expiresIn: new Date(
      Date() + process.env.JWT_COOKIE_EXPIRES_IN + 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      data: user,
    },
  });
};

const filterBody = (bodyData) => {
  Object.keys(bodyData).forEach((el) => {
    if (el === 'role') delete bodyData[el];
  });
  return bodyData;
};

exports.signUp = catchAsync(async (req, res, next) => {
  const filteredBody = filterBody(req.body);
  const newUser = await User.create(filteredBody);

  createAndSendJwtToken(res, 201, newUser);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(400, 'Please provide Email and Password'));

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError(401, 'Incorrect Email or Password'));
  createAndSendJwtToken(res, 200, user);
});

exports.hasAuthenticated = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }
  if (!token)
    return next(
      new AppError(401, 'Your are not logged in! Please Login to get access')
    );
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError(404, 'The user belonging to this token is does not exist')
    );

  req.user = freshUser;
  next();
});

exports.hasModuleAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, 'You do not have premission to perfrom this action')
      );
    }
    next();
  };
};
