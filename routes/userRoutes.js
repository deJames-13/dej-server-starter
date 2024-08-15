import { Router } from 'express';
import { protect } from '../middleware/index.js';
import { UserController } from './../controllers/index.js';

const userRouter = Router();

userRouter.post('/', UserController.register);
userRouter.post('/authenticate', UserController.authenticate);

userRouter.get('/', UserController.getUsers);
userRouter.post('/logout', protect, UserController.logout);

userRouter
  .route('/profile')
  .get(protect, UserController.getProfile)
  .put(protect, UserController.updateProfile);

export default userRouter;
