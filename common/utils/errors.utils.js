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
    name = 'AppError',
    message = 'An error occurred.',
    statusCode = 500,
    ...details
  }) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.errors = { ...details };
  }
}

const errorSchema = [
  { name: 'AuthorizationError', message: 'Unauthorized.', statusCode: 401 },
  { name: 'Forbidden', message: 'Forbidden.', statusCode: 403 },
  { name: 'NotFound', message: 'Resource not found.', statusCode: 404 },
  { name: 'Conflict', message: 'Resource already exists.', statusCode: 409 },
  { name: 'BadRequest', message: 'Bad request.', statusCode: 400 },
  { name: 'IamATeapot', message: "I'm a teapot.", statusCode: 418 },
  { name: 'ValidationError', message: 'Invalid input error.', statusCode: 422 },
  {
    name: 'InternalServerError',
    message: 'Internal server error.',
    statusCode: 500,
  },
];

const generateErrorClasses = (schema) => {
  return schema.reduce((acc, { name, message, statusCode }) => {
    acc[name] = class extends AppError {
      constructor(arg = {}) {
        let details;
        if (typeof arg === 'string') {
          message = arg;
          details = {};
        } else {
          ({ message: message = message, ...details } = arg);
        }
        super({ name, message, statusCode, ...details });
      }
    };
    return acc;
  }, {});
};

export default generateErrorClasses(errorSchema);
