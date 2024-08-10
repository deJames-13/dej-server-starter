import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.post('/', userController.register);
userRouter.post('/authenticate', userController.authenticate);

userRouter.get('/', protect, userController.getUsers);
userRouter.post('/logout', protect, userController.logout);

userRouter
  .route('/profile')
  .get(protect, userController.getProfile)
  .put(protect, userController.updateProfile);

export default userRouter;
