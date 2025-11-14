import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserEdit from "./UserEdit";
import ChangedPassword from "./ChangedPassword";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  phone: string;
  exp?: number;
  iat?: number;
}

interface State {
  changePassword: boolean;
  editProfile: boolean;
}
interface Action {
  type: "TOGGLE_CHANGE_PASSWORD" | "TOGGLE_EDIT_PROFILE";
}
const initialData: State = {
  changePassword: false,
  editProfile: false,
};
const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_CHANGE_PASSWORD":
      return {
        editProfile: false,
        changePassword: !state.changePassword,
      };
    case "TOGGLE_EDIT_PROFILE":
      return {
        changePassword: false,
        editProfile: !state.editProfile,
      };
    default:
      return state;
  }
};

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState<DecodedToken>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [state, dispatch] = useReducer(Reducer, initialData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: DecodedToken = jwtDecode(token);

      setUserInfo(decode);
    }
  }, []);

  return (
    <div className=" mx-auto px-4 w-full  ">
      {/* Main Content */}
      <div className="md:col-span-3 ">
        {/* My Profile Tab */}
        {/* {activeTab === "profile" && ( */}
        <div className="bg-white rounded-lg shadow p-8 ">
          <div className="flex justify-between items-center mb-8 pb-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          </div>

          {/* User Info Display */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Profile Information
            </h3>
            <div className="grid grid-cols-2  gap-6">
              {/* Username */}
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500 ">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                    Username
                  </p>
                </div>

                <p className="text-lg font-semibold text-gray-900">
                  {userInfo?.name || "N/A"}
                </p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-500">
                <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {userInfo?.email || "N/A"}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
                <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {userInfo?.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className={`flex flex-1 justify-center gap-x-4 `}>
            {" "}
            {/** flex-1 le remaining space matrai occupy garxa */}
            <Link
              to="/change-password"
              onClick={() => dispatch({ type: "TOGGLE_CHANGE_PASSWORD" })}
            >
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition text-sm md:text-base">
                CHANGE PASSWORD
              </button>
            </Link>
            <p>|</p>
            <Link
              to="/myaccount/useredit"
              onClick={() => dispatch({ type: "TOGGLE_EDIT_PROFILE" })}
            >
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition text-sm md:text-base">
                EDIT PROFILE
              </button>
            </Link>
          </div>

          {/* changePassword ? */}
          {/* <div
              className={`transition-all duration-500 ease-in-out overflow-hidden 
                p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200
                ${
              state.changePassword
                ? "opacity-100 max-h-[1000px] visible"
                : "hidden"
            }`}
          >
             <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2">
              Change Password
            </h3>
            {state.changePassword && (
              <div className="mt-2 pt-4 border-t border-gray-200">
                <UserEdit />
              </div>
            )}
          </div> */}
        </div>
        {/* )}  */}
        {/* Empty State for Other Tabs */}
        {/* {activeTab !== "profile" && (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600 text-lg">
                    Content for {activeTab} will appear here
                  </p>
                </div>
              )} */}
      </div>
      {/* Edit Profile Section with Transition */}
      {state.editProfile && (
        <div
          className={`transition-all duration-900 ease-in-out overflow-hidden  mt-8
                p-6 bg-gradient-to-r bg-[#F9FAFB] rounded-lg border border-blue-200
                ${
                  state.editProfile
                    ? "opacity-100 max-h-[1000px] visible"
                    : "opacity-0 max-h-0 invisible transition-opacity duration-2000 ease-in-out"
                }`}
        >
          <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2">
            Edit User Information
          </h3>
          {state.editProfile && (
            <div className="mt-2 pt-4 border-t border-gray-200">
              <UserEdit />
            </div>
          )}
        </div>
      )}

      {state.changePassword && (
        // {/* Edit Profile Section with Transition */}
        <div
          className={`transition-all duration-900 ease-in-out overflow-hidden  mt-8
                p-6 bg-gradient-to-r bg-[#F9FAFB] rounded-lg border border-blue-200
                ${
                  state.changePassword
                    ? "opacity-100 max-h-[1000px] visible"
                    : "opacity-0 max-h-0 invisible transition-opacity duration-2000 ease-in-out"
                }`}
        >
          <h3 className="text-lg font-semibold text-gray-900  flex items-center gap-2">
            Edit User Information
          </h3>
          {state.changePassword && (
            <div className="mt-2 pt-4 border-t border-gray-200">
              <ChangedPassword />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
