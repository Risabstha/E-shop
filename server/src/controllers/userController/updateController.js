import userModel from "../../models/userModel.js";


export const updateUser = async (req, res) => {
    const { username, email, phone } = req.body;
    const errors = [];
    try{
        if( !req.userId)
        {
            return res.status(401).json({ message: "Unauthorized User." });
        }

        if(!username && !email && !phone){
            errors.push("At least one field is required.");
        }
        if( errors.length > 0 ){
            return res.status(400).json({ errors });
        }

        const User = await userModel.findById(req.userId);      //ok

        if(!User){
            return res.status(404).json({ message: "User not found." });
        }
        
       await User.updateOne( { username , email , phone } );    // User (find gareko ma update garne)
       
        
        res.status(200).json({ message: 'User profile updated successfully' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" , error: error.message });      
    }
}
