/**
 * Represents a validation error.
 * @extends Error
 */
export class ValidationError extends Error {
  /**
   * Creates a new ValidationError instance.
   * @param {string} message - The error message.
   * @param {Array} errors - An array of validation errors.
   */
  constructor(message = 'Invalid input values.', errors) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 422;
    this.errors = errors;
  }
}

export class AuthorizationError extends Error {
  constructor(props = { message: 'Unauthorized.', errors: [] }) {
    super(props.message);
    this.statusCode = 401;
    this.name = this.constructor.name;
    this.errors = props.errors;
  }
}
