import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';

export const existingUserFun = async (email) => {
    const existinguser = await userModel.findOne({ email });
    return existinguser;
}

export const hashPasswordFun = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const createUserFun = async (username, email, password, phone) => {
    const newUser = new userModel({
        username,
        email,
        password,
        phone
    });
    await newUser.save();
    return newUser;
}