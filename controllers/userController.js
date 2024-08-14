import asyncHandler from 'express-async-handler';
import { UserService } from '../services/index.js';
import * as utils from '../utils/index.js';
import { userCreateRules, userUpdateRules } from '../validations/index.js';
import { UserResource } from './../resources/index.js';
import Controller from './controller.js';

class UserController extends Controller {
  // @desc    Get all users
  // route    GET /api/users
  // @access  Public
  static getUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAll();
    utils.successHandler({
      res,
      message: 'Users!',
      users: UserResource.collection(users),
    });
  });

  // @desc    Get first user that match the id
  // route    GET /api/users
  // @access  Public
  static getUser = asyncHandler(async (req, res) => {
    let user = await UserService.getById(req.params.id);
    utils.successHandler({
      res,
      message: 'User!',
      user: UserResource.make(user),
    });
  });

  // @desc    Register a new user
  // route    POST /api/users
  // @access  Public
  static register = asyncHandler(async (req, res) => {
    utils.tokenExists(req, UserService.authToken) &&
      utils.errorHandler({ res, message: 'Already authenticated!' });

    const validData = await utils.validate(req, res, userCreateRules);

    const { user, token } = await UserService.registerUser(validData);
    if (!user._id) utils.errorHandler({ res, message: 'Invalid user data!' });

    res.cookie(...token);
    utils.successHandler({
      res,
      message: 'Registered!',
      user: UserResource.make(user),
    });
  });

  // @desc    Authenticate user & get token
  // route    POST /api/users/authenticate
  // @access  Public
  static authenticate = asyncHandler(async (req, res) => {
    utils.tokenExists(req, UserService.authToken) &&
      utils.errorHandler({ res, message: 'Already authenticated!' });

    const { email, password } = req.body;
    const { user, token } = await UserService.authenticate(email, password);
    if (!user)
      return utils.errorHandler({ res, message: 'Invalid credentials' });

    res.cookie(...token);
    utils.successHandler({
      res,
      message: 'Authenticated!',
      user: UserResource.make(user),
    });
  });

  // @desc    Log user out
  // route    POST /api/users/logout
  // @access  Public
  static logout = asyncHandler(async (req, res) => {
    const token = await UserService.logout();

    res.cookie(...token);
    utils.successHandler({ res, message: 'Logged out!' });
  });

  // @desc    Get user profile
  // route    GET /api/users/profile
  // @access  Private
  static getProfile = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user._id)
      return utils.errorHandler({
        res,
        statusCode: 401,
        message: 'Unauthorized',
      });

    utils.successHandler({
      res,
      message: 'Profile fetch successfully!',
      user: UserResource.make(user),
    });
  });

  // @desc    Update user profile
  // route    PUT /api/users/profile
  // @access  Private
  static updateProfile = asyncHandler(async (req, res) => {
    req.body = { ...req.user.toObject(), ...req.body };

    const validData = await utils.validate(req, res, userUpdateRules);
    const user = await UserService.updateUser(req.user._id, validData);
    if (!user)
      return utils.errorHandler({ res, message: 'Invalid user data!' });

    utils.successHandler({
      res,
      message: 'Profile updated!',
      user: UserResource.make(user),
    });
  });
}
export default UserController;
