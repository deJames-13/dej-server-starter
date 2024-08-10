import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env/index.js';
import { getUser } from '../services/userService.js';
import { errorHandler } from '../utils/responseHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token)
    return errorHandler({
      res,
      statusCode: 401,
      message: 'Unauthorized: No token.',
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await getUser({ id: decoded.userId });

    next();
  } catch (e) {
    return errorHandler({
      res,
      statusCode: 401,
      message: 'Unauthorized: Invalid token.',
    });
  }
});

export { protect };
