import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, NODE_ENV } from '../env/index.js';

const generateToken = (res, userId, tokenAge) => {
  if (!userId) return null;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRE}d` || '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: (tokenAge || JWT_EXPIRE) * 24 * 60 * 60 * 1000,
  });
};

const destroyToken = (res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
};

export { destroyToken, generateToken };
