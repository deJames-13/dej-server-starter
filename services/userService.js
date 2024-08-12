import asyncHandler from 'express-async-handler';
import { User } from '../models/index.js';
import Service from './service.js';

export default class UserService extends Service {
  static getUsers = asyncHandler(async () => {
    const users = await User.find();
    return users;
  });

  static getUser = asyncHandler(async ({ id, email }) => {
    const user = await User.findOne({
      $or: [{ _id: id }, { email }],
    });
    return user;
  });

  static createUser = asyncHandler(async (body) => {
    const data = User.filterFillables(body);
    const user = await User.create(data);

    return user;
  });

  static updateUser = asyncHandler(async (id, body) => {
    const data = User.filterFillables(body);
    if (data.password) data.password = await User.hashPassword(data.password);
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  });

  static deleteUser = asyncHandler(async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
  });

  static authenticate = asyncHandler(async (email, password) => {
    let user = await User.findOne({ email });
    if (!user || !(user && (await user.matchPassword(password)))) return null;
    return user;
  });
}
