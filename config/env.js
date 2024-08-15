import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || null;
export const JWT_SECRET = process.env.JWT_SECRET || null;
export const JWT_EXPIRE = process.env.JWT_EXPIRE || null;
