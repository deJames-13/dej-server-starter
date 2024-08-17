import { JWT_SECRET } from '#config';
import { PRIVILEGES } from '#constants';
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

export const checkPermissions = (permissions = []) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = user.role;
    const userPermissions = user.permissions || PRIVILEGES[userRole];

    const hasPermission = permissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
