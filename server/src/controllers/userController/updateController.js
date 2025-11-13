import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export const updateUser = async (req, res) => {
  const { username, email, phone } = req.body;
  const errors = [];
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized User." });
    }

    if (!username && !email && !phone) {
      errors.push("At least one field is required.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const User = await userModel.findById(req.userId); //ok

    if (!User) {
      return res.status(404).json({ message: "User not found." });
    }

    // Build update object with only provided fields
    const updateData = { _id : req.userId}; // jun jun value pathako cha tyo matra update garna ko lagi
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    await User.updateOne( updateData); // id le specific user lai matra update garxa

    const newlyUpdatedUser = await userModel.findById(req.userId);

    const payload = {
      id: newlyUpdatedUser._id,
      name: newlyUpdatedUser.username,
      email: newlyUpdatedUser.email,
      phone: newlyUpdatedUser.phone,
      // iat: issued at timestamp (in seconds since epoch) by default jwt includes these in payload
      // exp: expiration timestamp (in seconds since epoch)
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "User profile updated successfully",
      token: token,
    });
    // return res.status(200).json({
    //   message: "User profile updated successfully"
    // });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
