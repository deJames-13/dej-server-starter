import { JWT_SECRET } from '#config';
import { UserService } from '#features';
import { errorHandler } from '#utils';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token = req.cookies.jwt || req.cookies[UserService.authToken];

  if (!token)
    return errorHandler({
      res,
      statusCode: 401,
      message: 'Unauthorized: No token.',
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await UserService.getById(decoded.userId);

    next();
  } catch (e) {
    return errorHandler({
      res,
      statusCode: 401,
      message: 'Unauthorized: Invalid token.',
      details: e,
    });
  }
};
