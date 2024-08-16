import { UserController } from '#controllers';
import { protect } from '#middlewares';

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
    controller: controller.getUser,
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
    method: 'put',
    controller: [protect, controller.updateProfile],
  },
];
