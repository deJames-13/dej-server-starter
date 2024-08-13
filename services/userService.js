import { User } from '../models/index.js';
import Service from './service.js';

class UserService extends Service {
  static model = User;

  static updateUser = async (id, body) => {
    const data = User.filterFillables(body);
    if (data.password) data.password = await User.hashPassword(data.password);
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  };

  static authenticate = async (email, password) => {
    let user = await User.findOne({ email });
    if (!user || !(user && (await user.matchPassword(password)))) return null;
    return user;
  };
}

export default UserService;
