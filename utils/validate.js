import { matchedData, validationResult } from 'express-validator';
import { ValidationError } from './errors.js';

/**
 * Validates the request based on the provided validation rules.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} validationRules - A function that returns an array of validation rules.
 * @returns {Object} - The validated and sanitized data.
 * @throws {ValidationError} - If validation fails.
 */
const validate = async (req, res, validationRules) => {
  await Promise.all(validationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('\n');
    throw new ValidationError(errorMessages, errors.array());
  }
  return matchedData(req);
};

export { validate };
