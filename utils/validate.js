import { validationResult } from 'express-validator';
import { errorHandler } from './responseHandler.js';

const validate = async (req, res, validation) => {
  await Promise.all(validation().map((rule) => rule.run(req)));
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
};

export { validate };
