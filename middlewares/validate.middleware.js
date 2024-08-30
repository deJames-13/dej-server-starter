import { ValidationError } from '#utils';
import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('. ');
    throw new ValidationError({
      message: errorMessages,
      details: errors.array(),
    });
  }
  next();
};
