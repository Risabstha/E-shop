
import userModel from "../../models/userModel.js";

export const deleteUser = async (req, res) => {
    // req.userId is available from the protectUserData middleware
    try {
        if( !req.userId)
        {
            return res.status(401).json({ message: "Unauthorized User." });
        }
        const userId = await userModel.findById(req.userId);
        if(!userId){
            return res.status(404).json({ message: "User not found." });
        }
        const user = await userModel.findByIdAndDelete(req.userId);

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" , error: error.message });
    }
  
}
