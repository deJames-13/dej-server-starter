import { validationResult } from 'express-validator';
import { errorHandler } from '../utils/responseHandler.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join('. ');
    return errorHandler({
      res,
      statusCode: 422,
      message: errorMessages,
      errors: errors.array(),
    });
  }
  next();
};

export { validate };
