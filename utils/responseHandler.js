import { ValidationError } from './errors.js';

/**
 * Handles error responses.
 * @param {Object} params - The parameters for the error handler.
 * @param {Object} params.res - The response object.
 * @param {number} [params.statusCode=400] - The HTTP status code.
 * @param {string} params.message - The error message.
 * @param {Object} [params.details] - Additional details about the error.
 * @throws {ValidationError|Error} - Throws a ValidationError if statusCode is 422, otherwise throws a generic Error.
 */
const errorHandler = ({ res, statusCode = 400, message, ...details }) => {
  res.status(statusCode);
  if (statusCode === 422) throw new ValidationError(message, details.errors);
  throw new Error(message);
};

/**
 * Handles successful responses.
 * @param {Object} params - The parameters for the success handler.
 * @param {Object} params.res - The response object.
 * @param {number} [params.statusCode=200] - The HTTP status code.
 * @param {string} [params.message] - The success message.
 * @param {Object} [params.details] - Additional details about the success response.
 * @returns {Object} - The JSON response object.
 */
const successHandler = ({ res, statusCode = 200, message, ...details }) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message: message ?? '',
    ...details,
  });
};

export { errorHandler, successHandler };
