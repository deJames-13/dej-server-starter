import { PRIVILEGES } from '#constants';
import { UserService } from '#features';
import { Errors, getBearerToken, verifyToken } from '#utils';

export const protect = async (req, res, next) => {
  let token =
    getBearerToken(req) ||
    req.cookies.jwt ||
    req.cookies[UserService.authToken];

  if (!token) new Errors.AuthorizationError();
  try {
    const decoded = verifyToken(token);
    req.user = await UserService.getById(decoded.userId);

    next();
  } catch (e) {
    throw new Errors.AuthorizationError({ errors: e?.statck });
  }
};

export const checkPermissions = (permissions = []) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = user?.role;
    const userPermissions = user?.permissions || PRIVILEGES[userRole] || [];

    const hasPermission = permissions.every((permission) =>
      userPermissions?.includes(permission)
    );

    if (!hasPermission) {
      throw new Errors.AuthorizationError({
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};

export const protectAndPermit = (permissions = []) => {
  return [protect, checkPermissions(permissions || [])];
};
