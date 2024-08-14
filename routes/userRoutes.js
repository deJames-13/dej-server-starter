import { protect } from '../middleware/index.js';
import routerHandler from '../utils/routerHandler.js';
import { UserController } from './../controllers/index.js';

export default routerHandler([
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
]);
