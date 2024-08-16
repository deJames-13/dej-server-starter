import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, NODE_ENV } from '../config/env.js';

const defaultCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV !== 'development',
  sameSite: 'strict',
  maxAge: JWT_EXPIRE * 24 * 60 * 60 * 1000,
};

/**
 * Checks if a token exists in the request cookies.
 * @param {Object} req - The request object.
 * @param {string} tokenName - The name of the token.
 * @returns {boolean} - True if the token exists, false otherwise.
 */
const tokenExists = (req, tokenName) => {
  return req.cookies[tokenName] ? true : false;
};

/**
 * Generates a JWT token and returns it along with cookie options.
 * @param {string} userId - The user ID to include in the token payload.
 * @param {string} [tokenName='jwt'] - The name of the token.
 * @param {number} [tokenAge=JWT_EXPIRE * 24 * 60 * 60 * 1000] - The age of the token in milliseconds.
 * @param {Object} [options={}] - Additional cookie options.
 * @returns {Array|null} - An array containing the token name, token, and cookie options, or null if userId is not provided.
 */
const generateToken = (userId, tokenName, tokenAge, options = {}) => {
  if (!userId) return null;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRE || 30}d`,
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

/**
 * Destroys a JWT token by setting its maxAge to 0.
 * @param {string} [tokenName='jwt'] - The name of the token.
 * @param {Object} [options={}] - Additional cookie options.
 * @returns {Array} - An array containing the token name, an empty string, and cookie options with maxAge set to 0.
 */
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
