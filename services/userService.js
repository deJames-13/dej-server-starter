import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { destroyToken, generateToken } from '../utils/tokenHandler.js';

export const getUsers = asyncHandler(async () => {
  const users = await User.find();
  return users;
});

export const getUser = asyncHandler(async ({ id, email }) => {
  const user = await User.findOne({
    $or: [{ _id: id }, { email }],
  });
  return user;
});

export const createUser = asyncHandler(async (body) => {
  const data = User.filterFillables(body);
  const user = await User.create(data);

  return user;
});

export const updateUser = asyncHandler(async (id, body) => {
  const data = User.filterFillables(body);
  if (data.password) data.password = await User.hashPassword(data.password);
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
});

export const deleteUser = asyncHandler(async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
});

export const authenticate = asyncHandler(async (email, password) => {
  let user = await User.findOne({ email });
  if (!user || !(user && (await user.matchPassword(password)))) return null;
  return user;
});
