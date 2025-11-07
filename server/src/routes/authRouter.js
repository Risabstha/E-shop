import express from 'express';
import {  registerUser } from '../controllers/authController/registerController.js';

const authRouter = express.Router();

// authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);

export default authRouter;