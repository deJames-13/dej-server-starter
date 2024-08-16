import { ValidationError } from '#utils';
import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('. ');
    throw new ValidationError(errorMessages, errors.array());
  }
  next();
};

export { validate };
