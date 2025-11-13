import React, { useState } from "react";
import InputField from "../formComponents/InputField";
import { updateUser } from "../../apis/authApi/AuthApi";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  phone: string;
  exp?: number;
  iat?: number;
}

const UserEdit = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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
    const { fullName, email, phone } = formData;
    if (!fullName && !email && !phone) {
      return "At least one field must be filled.";
    }
  };
  const Datatoupdate = () => {
    // Only include fields that have values
    const data: {
      username?: string;
      email?: string;
      phone?: string;
    } = {};

    if (formData.fullName) data.username = formData.fullName;
    if (formData.email) data.email = formData.email;
    if (formData.phone) data.phone = formData.phone;

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
      console.log("🚀 ~ handleUpdateProfile ~ dataToSend:", dataToSend)
    
      // Call updateUser with formData and userId
      const response = await updateUser(dataToSend, userId, token); // login vayepachi hune sabai rest operation ma token send garna parxa
      console.log("running 2");
      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        setFormData({ fullName: "", email: "", phone: "" });

        // Update localStorage if needed
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
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
      <form className="space-y-6" onSubmit={handleUpdateProfile}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <InputField
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholders="Full Name"
            textarea={false}
          />

          {/* Email */}
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholders="Email Address"
            textarea={false}
          />
        </div>

        {/* Phone */}
        <div className="  m-auto ">
          <div className="w-[48.5%]">
            <InputField
              type="string"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholders="Phone Number"
              textarea={false}
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="pt-4">
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

export default UserEdit;
