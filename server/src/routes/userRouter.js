import express from 'express';
import { updateUser } from '../controllers/userController/updateController.js';
import { deleteUser } from '../controllers/userController/deleteController.js';
import { protectUserData } from '../middlewares/userMiddleware.js';

const userRouter = express.Router();

userRouter.put('/:id', protectUserData, updateUser );
userRouter.delete('/:id', protectUserData, deleteUser );

export default userRouter;