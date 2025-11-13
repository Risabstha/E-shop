import express from 'express';
import { updateUser } from '../controllers/userController/updateController.js';
import { deleteUser } from '../controllers/userController/deleteController.js';
import { protectUserData } from '../middlewares/userMiddleware.js';
import { updatePasswordController } from '../controllers/userController/updatePasswordController.js';

const userRouter = express.Router();

userRouter.put('/userUpdate/:id', protectUserData, updateUser );
userRouter.put('/password/:id', protectUserData, updatePasswordController );
userRouter.delete('/:id', protectUserData, deleteUser );

export default userRouter;