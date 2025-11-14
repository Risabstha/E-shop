import React, { useState } from "react";
import InputField from "../formComponents/InputField";
import { updatePassword } from "../../apis/authApi/AuthApi";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  phone: string;
  exp?: number;
  iat?: number;
}

const ChangedPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const InputValidation = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return "All fields must be filled.";
    }
  };
  const Datatoupdate = () => {
    const {currentPassword, newPassword, confirmPassword} = formData;
    // Only include fields that have values
    const data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    } = {
      currentPassword : currentPassword,
      newPassword,        // it is newPassword : newPassword,
      confirmPassword
    };



    return data;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validation = InputValidation();
    if (validation) {
      setError(validation);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      // Decode token to get user ID
      const decodedToken: DecodedToken = jwtDecode(token); //token local storage bata get gareko
      const userId = decodedToken.id;

      if (!userId) {
        setError("User ID not found in token");
        return;
      }

      const dataToSend = Datatoupdate();
      console.log("🚀 ~ handleUpdateProfile ~ dataToSend:", dataToSend);

      // Call updateUser with formData and userId
      const response = await updatePassword(dataToSend, userId, token); // login vayepachi hune sabai rest operation ma token send garna parxa
      console.log("running 2");
      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMsg);
      console.error("Update failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Form */}
      <form className="space-y-6 flex flex-col items-center" onSubmit={handleUpdateProfile}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-[50%] ">

          {/* Full Name */}
          <InputField
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholders="Current Password"
            textarea={false}
          />

          {/* Email */}
          <InputField
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholders="New Password"
            textarea={false}
          />
          <InputField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholders="Confirm Password"
            textarea={false}
          />
        </div>

        <div className="  m-auto ">
          <div></div>
        </div>

        {/* Update Button */}
        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#fa5518] transition duration-300 shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "UPDATING..." : "UPDATE PROFILE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangedPassword;
