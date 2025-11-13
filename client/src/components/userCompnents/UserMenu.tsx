import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FaRegUser,
  FaMapPin,
  FaHeart,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

interface DecodedToken {
  id: string; 
  name: string;
  email: string;
  exp?: number;
  iat?: number;
};

const UserMenu = () => {
  const location = useLocation();
  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: FaRegUser,
      link: "/myaccount",
    },
    {
      id: "address",
      label: "Address",
      icon: FaMapPin,
      link: "/address",
    },
    {
      id: "wishlist",
      label: "My List",
      icon: FaHeart,
      link: "/wishlist",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: FaBoxes,
      link: "/orders",
    },
    {
      id: "security",
      label: "Account Security",
      icon: MdOutlineSecurity,
      link: "/security",
    },
  ];

  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  useEffect( () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: DecodedToken = jwtDecode(token);
      setUserInfo(decode);
    }
  })
 
  return (
    <div className=" ">
      
      <div className="">
        {/* Sidebar */}
        <div className="">
          <div className="bg-white rounded-lg shadow p-6 sticky top-28">
            {/* Profile Card */}
            <div className="text-center mb-6 pb-6 border-b">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <FaRegUser size={40} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {userInfo?.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {userInfo?.email}
              </p>
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition 
                          ${ location.pathname === item.link ? " rounded-lg text-orange-600 border-l" : ""}
                      text-gray-700 hover:bg-gray-100
                    `}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:text-red-600 hover:bg-red-50 transition font-semibold mt-4 border-t"
              >
                <FaSignOutAlt size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
