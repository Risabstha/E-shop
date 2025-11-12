import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const secretKey = process.env.JWT_SECRET;

export const protectUserData = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }

    const decodedToken = jwt.verify(token, secretKey); // token ma vako object pani store hunxa

    req.userId = decodedToken.id;           //ok

    const userID = req.params.id;           //ok

    if (userID) {
      const user = await userModel.findById(userID);        //ok  param ma pathako id  ho userID
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error at middleware" , error: error.message});
  }
};
