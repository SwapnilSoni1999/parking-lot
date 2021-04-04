/**
 * Express Controller handler
 * @param {Function} func Express Middleware
 * @returns 
 */
const catchAsync = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
}

module.exports = catchAsync
