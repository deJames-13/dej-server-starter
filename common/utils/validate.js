import { matchedData, validationResult } from 'express-validator';
import Errors from './errors.js';

/**
 * Validates the request based on the provided validation rules.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} validationRules - A function that returns an array of validation rules.
 * @returns {Object} - The validated and sanitized data.
 * @throws {ValidationError} - If validation fails.
 */
export const validate = async (req, res, validationRules) => {
  await Promise.all(validationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('\n');
    throw new Errors.ValidationError({
      message: errorMessages,
      details: errors.array(),
    });
  }
  return matchedData(req);
};

export const isUnique =
  (model, field, exclude = {}) =>
  async (value) => {
    const query = { [field]: value };
    Object.keys(exclude).forEach((key) => {
      if (query[key]) query[key] = { ...query[key], $ne: exclude[key] };
      else query[key] = { $ne: exclude[key] };
    });
    const existing = await model.findOne(query);
    if (existing)
      throw new Errors.Conflict(
        `${model?.name || 'Resource'} with ${field} already exists!`
      );
  };
