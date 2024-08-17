/**
 * Represents a validation error.
 * @extends Error
 */

export class AppError extends Error {
  /**
   * Creates a new AppError instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor({
    message = 'An error occurred.',
    statusCode = 500,
    ...details
  }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = details;
  }
}

const errorSchema = [
  { name: 'AuthorizationError', message: 'Unauthorized.', statusCode: 401 },
  { name: 'Forbidden', message: 'Forbidden.', statusCode: 403 },
  { name: 'NotFound', message: 'Resource not found.', statusCode: 404 },
  { name: 'Conflict', message: 'Resource already exists.', statusCode: 409 },
  {
    name: 'InternalServerError',
    message: 'Internal server error.',
    statusCode: 500,
  },
];

const generateErrorClasses = (schema) => {
  return schema.reduce((acc, { name, message, statusCode }) => {
    acc[name] = class extends AppError {
      constructor({ message: customMessage = message, ...details } = {}) {
        super({ message: customMessage, statusCode, ...details });
      }
    };
    return acc;
  }, {});
};

export default generateErrorClasses(errorSchema);
