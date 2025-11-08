import React, { useState } from "react";
import AuthModal from "../../utils/AuthModal";
import InputField from "../../components/formComponents/InputField";
import NavBar from "../../layouts/NavBar";
import { loginUser } from "../../apis/authApi/AuthApi";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../../components/formComponents/ButtonForm.tsx";

interface formvalue {
  email: string;
  password: string;
}


const Login = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<formvalue>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("")
  const formValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const loginValidation = () => {
    const {email, password} = formValue;
     if( !email || !password) {
      return "All fields are required"
     }
     else if( password.length < 6){
      return "Password length must be greater than 6 "
     }
     else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      return "Email format is invalid";
    }
    return "";
  }

  const submitLogin = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginvalidation = loginValidation();
    if( loginvalidation) {
      setMessage(loginvalidation);
      return;
    }

    try{
      const res = await loginUser(formValue);
      if( res.status === 200){
        setFormValue({ email: "", password: "" });
        setMessage("");
        // Access data from userdetails object
         localStorage.setItem("token", res.data.userdetails.token);
         
        navigate("/");
      }
    }
    catch(error : any){
      const {status, data} = error.response;
      if(status === 404 ) {
        setMessage("User not found. Please register first.");
      }
       else if (status === 400) {
        setMessage(data.message);
      } else {
        setMessage(data?.message || "Something went wrong");  // error object (err) that Axios throws still includes a .response.data property. 
      }
    }
  }

  return (
    <div className="bg-[#f5f0f0]">
      <NavBar />
      <div className="flex justify-center pt-35 pb-30">
        <AuthModal
          modal_title="Login to your account"
          isRegister={false}
          modal_width="w-md"
        >
          <form className="py-6 w-[80%] m-auto space-y-5" onSubmit={submitLogin}>
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
              <ButtonForm
                types="submit"
                value="LOGIN"
                disabled={false}
                width="w-[100%]"
              />
            </div>
          </form>
        </AuthModal>
      </div>
    </div>
  );
};

export default Login;
