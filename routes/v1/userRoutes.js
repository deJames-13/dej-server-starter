import { UserController } from './../../controllers/index.js';
import { protect } from './../../middleware/index.js';

export default [
  {
    path: '/',
    method: 'get',
    controller: UserController.getUsers,
  },
  {
    path: '/:id',
    method: 'get',
    controller: UserController.getUser,
  },
  {
    path: '/',
    method: 'post',
    controller: UserController.register,
  },
  {
    path: '/authenticate',
    method: 'post',
    controller: UserController.authenticate,
  },
  {
    path: '/logout',
    method: 'post',
    controller: [protect, UserController.logout],
  },
  {
    path: '/profile',
    method: 'get',
    controller: [protect, UserController.getProfile],
  },
  {
    path: '/profile',
    method: 'put',
    controller: [protect, UserController.updateProfile],
  },
];
