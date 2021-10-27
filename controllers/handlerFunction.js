const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAllDocuments = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: docs,
      },
    });
  });

exports.updateDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(new AppError(404, 'There is no ducment found with that ID'));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc)
      return next(new AppError(404, 'There is no document found with that ID'));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(new AppError(404, 'There is no document found with that ID'));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
