/**
 * Custom Application Error class for consistent error handling
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a new AppError instance
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {AppError} AppError instance
 */
export const createError = (message, statusCode) => {
  return new AppError(message, statusCode);
};