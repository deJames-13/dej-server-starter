import { Controller } from '#lib';
import { Errors, tokenExists } from '#utils';
import UserResource from './user.resource.js';
import UserService from './user.service.js';
import { userCreateRules, userUpdateRules } from './user.validation.js';

class UserController extends Controller {
  service = UserService;
  resource = UserResource;
  rules = {
    create: userCreateRules,
    update: userUpdateRules,
  };

  // @desc    Register a new user
  // route    POST /api/users
  // @access  Public
  register = async (req, res) => {
    if (tokenExists(req, this.service.authToken))
      return this.error({ res, message: 'Already authenticated!' });

    const validData = await this.validator(req, res, this.rules.create);
    const { user, token } = await this.service.registerUser(validData);
    if (!user._id) throw new Errors.BadRequest('Invalid user data!');

    res.cookie(...token);
    this.success({
      res,
      message: 'Registered!',
      user: this.resource.make(user),
    });
  };

  // @desc    Authenticate user & get token
  // route    POST /api/users/authenticate
  // @access  Public
  authenticate = async (req, res) => {
    if (tokenExists(req, this.service.authToken))
      throw new Errors.BadRequest('Already authenticated!');

    const { email, password } = req.body;
    const { user, token } = await this.service.authenticate(email, password);
    if (!user?._id) throw new Errors.BadRequest('Invalid credentials!');

    res.cookie(...token);
    this.success({
      res,
      message: 'Authenticated!',
      user: this.resource.make(user),
    });
  };

  // @desc    Log user out
  // route    POST /api/users/logout
  // @access  Public
  logout = async (req, res) => {
    const token = await this.service.logout();

    res.cookie(...token);
    this.success({ res, message: 'Logged out!' });
  };

  // @desc    Get user profile
  // route    GET /api/users/profile
  // @access  Private
  getProfile = async (req, res) => {
    const user = req.user;

    if (!user?._id) throw new Errors.BadRequest('Invalid user data!');

    this.success({
      res,
      message: 'Profile fetch successfully!',
      user: this.resource.make(user),
    });
  };

  // @desc    Update user profile
  // route    PUT /api/users/profile
  // @access  Private
  updateProfile = async (req, res) => {
    const validData = await this.validator(req, res, this.rules.update);
    const user = await this.service.updateUser(req.user._id, validData);
    if (!user) throw new Errors.BadRequest('Invalid user data!');

    this.success({
      res,
      message: 'Profile updated!',
      user: this.resource.make(user),
    });
  };
}
export default new UserController();
