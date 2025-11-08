import { createToken, findUserByEmail, passwordsMatch } from "../../services/authServices/loginServices.js";

 
 export const loginUser =  async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    try {
        if( !email || !password ) {
            errors.push({ message: 'Please enter all fields' });
        }
        if(errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const existingUser = await findUserByEmail(email);      // find vayo vane obje store hunxa existingUser ma
        if(!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const isMatch = await passwordsMatch(password, existingUser.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const userwithToken = createToken(existingUser);        // yesle token return garxa
        
        return res.status(200).json({ message: "Login successful" , userdetails:{
            token : userwithToken
        } });       // userwithToken ma _id, username, email ra token xa
    } catch (error) {

        res.status(500).json({ message: "Internal server error", error : error.message });
    }
 }