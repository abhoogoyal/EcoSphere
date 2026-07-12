const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// Generic CRUD factory. Keeps Department/Category/EmissionFactor/Badge/Reward
// controllers consistent and avoids copy-paste drift across the codebase.
//
// options:
//   populate: string | object | array - passed straight to Mongoose .populate()

const crudFactory = (Model, resourceName = 'Resource', options = {}) => {
  const { populate } = options;

  const applyPopulate = (query) => {
    if (populate) {
      return query.populate(populate);
    }
    return query;
  };

  const getAll = asyncHandler(async (req, res) => {
    let query = Model.find();
    query = applyPopulate(query);
    const items = await query.sort('-createdAt');

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  });

  const getOne = asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    query = applyPopulate(query);
    const item = await query;

    if (!item) {
      return next(
        new ErrorResponse(`${resourceName} not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: item
    });
  });

  const createOne = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);

    res.status(201).json({
      success: true,
      data: item
    });
  });

  const updateOne = asyncHandler(async (req, res, next) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return next(
        new ErrorResponse(`${resourceName} not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: item
    });
  });

  const deleteOne = asyncHandler(async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id);

    if (!item) {
      return next(
        new ErrorResponse(`${resourceName} not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  });

  return { getAll, getOne, createOne, updateOne, deleteOne };
};

module.exports = crudFactory;
