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
  constructor(message, errors) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
  }
}
