// Wraps async controller functions so rejected promises are passed to next(),
// letting the centralized error handler deal with them.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
