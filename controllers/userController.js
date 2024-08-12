import asyncHandler from 'express-async-handler';
import { UserService } from '../services/index.js';
import * as utils from '../utils/index.js';
import { userCreateRules, userUpdateRules } from '../validations/index.js';
import { UserResource } from './../resources/index.js';
import Controller from './controller.js';

export default class UserController extends Controller {
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

  // @desc    Authenticate user & get token
  // route    POST /api/users/authenticate
  // @access  Public
  static authenticate = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.authenticate(email, password);
    if (!user)
      return utils.errorHandler({ res, message: 'Invalid credentials' });

    utils.generateToken(res, user._id);
    utils.successHandler({
      res,
      message: 'Authenticated!',
      user: UserResource.make(user),
    });
  });

  // @desc    Register a new user
  // route    POST /api/users
  // @access  Public
  static register = asyncHandler(async (req, res) => {
    await validate(req, res, userCreateRules);

    const userExists = await UserService.getOne({ email: req.body?.email });
    if (userExists)
      return utils.errorHandler({ res, message: 'User already exists' });

    const user = await UserService.create(req.body);
    if (!user._id) utils.errorHandler({ res, message: 'Invalid user data!' });

    utils.generateToken(res, user._id);
    utils.successHandler({
      res,
      message: 'Registered!',
      user: UserResource.make(user),
    });
  });

  // @desc    Log user out
  // route    POST /api/users/logout
  // @access  Public
  static logout = asyncHandler(async (req, res) => {
    utils.destroyToken(res);
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
    await validate(req, res, userUpdateRules);

    const user = await UserService.updateUser(req.user._id, req.body);
    if (!user)
      return utils.errorHandler({ res, message: 'Invalid user data!' });

    utils.successHandler({
      res,
      message: 'Profile updated!',
      user: UserResource.make(user),
    });
  });
}
