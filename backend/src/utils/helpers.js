/**
 * Utility function to catch async errors in route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Send success response with consistent format
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 */
export const sendSuccessResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };
  
  res.status(statusCode).json(response);
};

/**
 * Send error response with consistent format
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object} errors - Validation errors (optional)
 */
export const sendErrorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  
  res.status(statusCode).json(response);
};