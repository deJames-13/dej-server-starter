import { NODE_ENV } from '#config';
import { APP } from '#constants';

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err?.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }
  res.status(statusCode).json({
    ...err,
    message,
    statusCode,
    status: err.name,
    stack: NODE_ENV === APP.STATUS.PRODUCTION ? null : err.stack,
  });
};
