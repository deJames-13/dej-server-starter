import { Service } from '#lib';
import { destroyToken, Errors, generateToken } from '#utils';
import UserModel from './userModel.js';

class UserService extends Service {
  model = UserModel;
  authToken = 'jwt';

  async registerUser(body) {
    const userExists = await this.checkIfExists({ email: body.email });
    if (userExists)
      new Errors.BadRequest('User with that email already exists!');

    const user = await this.create(body);
    const token = generateToken(user._id, this.authToken);
    return { user, token };
  }

  async authenticate(email, password) {
    let user = await this.model?.findOne({ email });
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
    if (userExists)
      throw new Errors.BadRequest('User with that email already exists!');

    const data = this.model?.filterFillables(body);
    if (data.password)
      data.password = await this.model?.hashPassword(data.password);
    const user = await this.model?.findByIdAndUpdate(id, data, { new: true });
    return user;
  }
}

export default new UserService();
