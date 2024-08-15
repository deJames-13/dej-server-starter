import { matchedData, validationResult } from 'express-validator';
import ValidationError from '../errors/validationError.js';

const validate = async (req, res, validationRules) => {
  await Promise.all(validationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('. ');
    throw new ValidationError(errorMessages, errors.array());
  }
  return matchedData(req);
};

export { validate };
