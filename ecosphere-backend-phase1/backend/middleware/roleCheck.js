const ErrorResponse = require('../utils/errorResponse');

// Usage: roleCheck(['Admin']) or roleCheck(['Admin', 'DeptHead'])
// Must be used AFTER the `protect` middleware, since it relies on req.user.
const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized, no user context', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Role '${req.user.role}' is not authorized to access this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = roleCheck;
