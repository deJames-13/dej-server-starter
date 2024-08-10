import ValidationError from '../errors/validationError.js';

const errorHandler = ({ res, statusCode = 400, message, ...details }) => {
  res.status(statusCode);
  if (statusCode === 422) throw new ValidationError(message, details.errors);
  throw new Error(message);
};

const successHandler = ({ res, statusCode = 200, message, ...details }) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message: message ?? '',
    ...details,
  });
};

export { errorHandler, successHandler };
