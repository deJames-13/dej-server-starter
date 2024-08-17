import { protect } from '#middlewares/authMiddleware';
import UserController from './userController.js';

const controller = UserController;
export default [
  {
    path: '/',
    method: 'get',
    controller: controller.getALl,
  },
  {
    path: '/:id',
    method: 'get',
    controller: controller.getById,
  },
  {
    path: '/',
    method: 'post',
    controller: controller.register,
  },
  {
    path: '/authenticate',
    method: 'post',
    controller: controller.authenticate,
  },
  {
    path: '/logout',
    method: 'post',
    controller: [protect, controller.logout],
  },
  {
    path: '/profile',
    method: 'get',
    controller: [protect, controller.getProfile],
  },
  {
    path: '/profile',
    method: 'patch',
    controller: [protect, controller.updateProfile],
  },
];
