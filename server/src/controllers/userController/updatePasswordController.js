import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const updatePasswordController = async (req, res) => {
  //   const { userId } = req.params;   // yedi userId lai object ko rup ma lina cha vane
  const userId = req.params.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const errors = [];
  try {
    // Proceed with password update logic here
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match." });
    }
    if (newPassword.length < 6 || newPassword.length > 20) {
      errors.push("Password must be 6 and 20 characters long.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    await userModel.updateOne({ _id: userId }, { password: hashedNewPassword }); //It specifies a query filter { _id: userId } → only updates that specific user.

    return res.status(200).json({
      message: "Password updated successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error controller" });
  }
};
