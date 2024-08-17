import { METHODS, PATHS, READ_WRITE } from '#constants';
import { protectAndPermit } from '#middlewares/authMiddleware';
import UserController from './userController.js';

const controller = UserController;
export default [
  {
    path: PATHS.ROOT,
    method: METHODS.GET,
    controller: controller.getALl,
  },
  {
    path: PATHS.ROOT,
    method: METHODS.POST,
    controller: controller.register,
  },
  {
    path: PATHS.AUTHENTICATE,
    method: METHODS.POST,
    controller: controller.authenticate,
  },
  {
    path: PATHS.LOGOUT,
    method: METHODS.POST,
    controller: [...protectAndPermit(), controller.logout],
  },
  {
    path: PATHS.PROFILE,
    method: METHODS.GET,
    controller: [...protectAndPermit(), controller.getProfile],
  },
  {
    path: PATHS.PROFILE,
    method: METHODS.PATCH,
    controller: [...protectAndPermit(READ_WRITE), controller.updateProfile],
  },
  {
    path: PATHS.ID,
    method: METHODS.GET,
    controller: controller.getById,
  },
];
