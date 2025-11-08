import React, { useState } from "react";
import AuthModal from "../../utils/AuthModal";
import InputField from "../../components/formComponents/InputField";
import NavBar from "../../layouts/NavBar";
import { registerUser } from "../../apis/authApi/AuthApi";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../../components/formComponents/ButtonForm.tsx";

interface formvalue {
  username: string;
  email: string;
  password: string;
}
const Register = () => {
  const Navigate = useNavigate();
  const [formValue, setFormValue] = useState<formvalue>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const formValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const RegisterValidation = () => {
    // Implement registration validation logic here
    if (!formValue.username || !formValue.email || !formValue.password) {
      return "All fields are required";
    } else if (formValue.password.length < 6) {
      return "Password must be at least 6 characters long";
    } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      return "Email format is invalid";
    } else {
      return "";
    }
  };

  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validationMessage =  RegisterValidation();
      if( validationMessage) {   
        setMessage(validationMessage); 
        return ;}

        //only runs if validationMessage is empty
        const res = await registerUser(formValue);
        if( res.status === 201){
        setFormValue({ username: "", email: "", password: "" });
        setMessage("");
        Navigate("/login");
      }
    
    } catch (err : any) {
      console.error("Registration failed", err);
      // Axios puts response info in err.response
    if (err.response) {
      const { status, data } = err.response;    // status le status contain garxa , data le json contain garxa (axios le parse gari sakeko hunxa )

      if (status === 409) {
        setMessage(data.message );
      } else if (status === 400) {
        setMessage(data.message);
      } else {
        setMessage(data?.message || "Something went wrong");  // error object (err) that Axios throws still includes a .response.data property. 
      }
    } else {
      // network or unknown error
      setMessage("Network error. Please try again later.");
    }
    }
  };

  return (
    <div className="bg-[#f5f0f0] ">
      <NavBar />
      <div className="flex justify-center pt-35 pb-30">
        <AuthModal
          modal_title="Register with new account"
          isRegister={true}
          modal_width="w-md"
        >
          <form
            className="py-6 w-[80%] m-auto space-y-5"
            onSubmit={submitRegistration}
          >
            <InputField
              type="text"
              id="username"
              name="username"
              value={formValue.username}
              placeholders="Username"
              onChange={formValueChange}
            />
            <InputField
              type="email"
              id="email"
              name="email"
              value={formValue.email}
              placeholders="Email"
              onChange={formValueChange}
            />
            <InputField
              type="password"
              id="password"
              name="password"
              value={formValue.password}
              placeholders="Password"
              onChange={formValueChange}
            />
            {message && <p className="text-red-500 text-center">{message}</p>}
            <div className=" w-full flex justify-center ">
              <ButtonForm types="submit" value="REGISTER" width="w-[100%]" />
            </div>
          </form>
        </AuthModal>
      </div>
    </div>
  );
};

export default Register;
