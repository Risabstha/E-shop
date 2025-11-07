import { createUserFun, existingUserFun, hashPasswordFun } from "../../services/authServices/registerServices.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const errors = [];

  try {
    //validation
    if (!username || !email || !password) {
      errors.push("All fields are required.");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Invalid email format.");
    }
    if (password.length < 6 || password.length > 20) {
      errors.push("Password must be 6 and 20 characters long.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // existing user check, findOne le null return garcha if user not found
    const existingUser = await existingUserFun(email);     
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await hashPasswordFun(password);
    
    const createUser = await createUserFun(username, email, hashedPassword);

    return res
      .status(201)
      .json({ message: "User registered successfully",
            user: {
              id: createUser._id,
              username: createUser.username,
              email: createUser.email
            }
       });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
