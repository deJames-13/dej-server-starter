import { User } from '../models/index.js';
import { destroyToken, generateToken } from '../utils/index.js';
import Service from './service.js';

class UserService extends Service {
  model = User;
  authToken = 'jwt';

  async registerUser(body) {
    const userExists = await this.checkIfExists({ email: body.email });
    if (userExists) throw new Error('User with that email already exists!');

    const user = await this.create(body);
    const token = generateToken(user._id, this.authToken);
    return { user, token };
  }

  async authenticate(email, password) {
    let user = await User.findOne({ email });
    if (!user || !(user && (await user.matchPassword(password)))) user = null;
    const token = user && generateToken(user._id, this.authToken);

    return { user, token };
  }

  async logout() {
    return destroyToken(this.authToken);
  }

  async updateUser(id, body) {
    const userExists = await this.checkIfExists({
      email: body.email,
      _id: { $ne: id },
    });
    if (userExists) throw new Error('User with that email already exists!');

    const data = User.filterFillables(body);
    if (data.password) data.password = await User.hashPassword(data.password);
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  }
}

export default new UserService();
