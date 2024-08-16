import { UserResource } from '#resources';
import { UserService } from '#services';
import { tokenExists } from '#utils';
import { userCreateRules, userUpdateRules } from '#validations';
import Controller from './controller.js';

class UserController extends Controller {
  service = UserService;
  resource = UserResource;

  // @desc    Register a new user
  // route    POST /api/users
  // @access  Public
  register = async (req, res) => {
    if (tokenExists(req, this.service.authToken))
      return this.error({ res, message: 'Already authenticated!' });

    const validData = await this.validator(req, res, userCreateRules);
    const { user, token } = await this.service.registerUser(validData);
    if (!user._id) return this.error({ res, message: 'Invalid user data!' });

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
      return this.error({ res, message: 'Already authenticated!' });

    const { email, password } = req.body;
    const { user, token } = await this.service.authenticate(email, password);
    if (!user?._id) return this.error({ res, message: 'Invalid credentials!' });

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

    if (!user._id)
      return this.error({
        res,
        statusCode: 401,
        message: 'Unauthorized',
      });

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
    req.body = { ...req.user.toObject(), ...req.body };

    const validData = await this.validator(req, res, userUpdateRules);
    const user = await this.service.updateUser(req.user._id, validData);
    if (!user) return this.error({ res, message: 'Invalid user data!' });

    this.success({
      res,
      message: 'Profile updated!',
      user: this.resource.make(user),
    });
  };
}
export default new UserController();
