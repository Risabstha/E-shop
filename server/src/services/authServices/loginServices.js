import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};

export const passwordsMatch = async (inputPassword, storedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  return isMatch;
};

export const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.username,
    email: user.email,
    phone: user.phone,
    // iat: issued at timestamp (in seconds since epoch) by default jwt includes these in payload
    // exp: expiration timestamp (in seconds since epoch)
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET,
  { expiresIn: "1d" });
  return token;
};
