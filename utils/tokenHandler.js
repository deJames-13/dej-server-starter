import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, NODE_ENV } from '../config/env.js';

const defaultCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV !== 'development',
  sameSite: 'strict',
  maxAge: JWT_EXPIRE * 24 * 60 * 60 * 1000,
};

const tokenExists = (req, tokenName) => {
  return req.cookies[tokenName] ? true : false;
};

const generateToken = (userId, tokenName, tokenAge, options = {}) => {
  if (!userId) return null;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRE}d` || '30d',
  });

  return [
    tokenName || 'jwt',
    token,
    {
      ...defaultCookieOptions,
      maxAge: tokenAge || JWT_EXPIRE * 24 * 60 * 60 * 1000,
      ...options,
    },
  ];
};

const destroyToken = (tokenName, options = {}) => {
  return [
    tokenName || 'jwt',
    '',
    {
      ...defaultCookieOptions,
      maxAge: 0,
      ...options,
    },
  ];
};

export { destroyToken, generateToken, tokenExists };
