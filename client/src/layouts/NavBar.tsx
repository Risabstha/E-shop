import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo_light.png";
import SearchBar from "../components/NavBarComponent/SearchBar";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Tooltip from "@mui/material/Tooltip";
import { FaLocationDot } from "react-icons/fa6";
import { PiGridFourFill } from "react-icons/pi";


interface DecodedToken {
  id: string;
  name: string;
  email: string;
  exp?: number;
  iat?: number;
}

interface useroption {
  title: string;
  icon: JSX.Element;
  link: string;
}

const userOption: useroption[] = [
  {
    title: "My Account",
    icon: <FaRegUser size={18} className="text-gray-600" />,
    link: "/myaccount",
  },
  {
    title: "Address",
    icon: <FaLocationDot  size={18} className="text-gray-600" />,
    link: "/address",
  },
  {
    title: "Orders",
    icon: <PiGridFourFill  size={18} className="text-gray-600" />,
    link: "/orders",
  },
  {
    title: "My List",
    icon: <FaRegHeart size={18} className="text-gray-600" />,
    link: "/mylist",
  },
];

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: DecodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setUserInfo(decode);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserInfo(null);
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="hidden lg:flex fixed top-0 w-full justify-between items-center lg:px-6 xl:px-10 py-5  bg-white shadow-md z-50">
        <Link to="/">
          <img src={logo} alt="Logo" className=" xl:w-[13rem] lg:w-[12rem]  " />
        </Link>

        {/* search bar component */}
        <SearchBar />

        <div className="flex xl:gap-x-5 lg:gap-x-4 items-center">
          {/*  if user is logged in, show user info and logout button */}
          <div ref={dropdownRef} className="relative">
            {isLoggedIn ? (
              <div
                className="flex items-center cursor-pointer px-2 py-1 rounded-lg transition hover:bg-gray-100"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {/* <img src=  alt={profile_image}/> */}
                <div className="inline-block mr-2 rounded-full bg-gray-200 p-3">
                  <FaRegUser size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {userInfo?.name}
                  </p>
                  <p className="text-[0.9rem] text-gray-500">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-2 text-lg">
                <Link
                  to="/login"
                  className=" hover:text-[#FF6B35] px-1 cursor-pointer text-gray-600"
                >
                  LOGIN
                </Link>
                <div className="">|</div>

                <Link
                  to="/register"
                  className=" hover:text-[#FF6B35] px-1 cursor-pointer text-gray-600"
                >
                  REGISTER
                </Link>
              </div>
            )}

            {/* Dropdown Menu */}
            {isLoggedIn && showDropdown && (
              <div className="absolute  mt-2 min-w-56 w-full overflow-hidden bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                {/* User Profile Header */}
                <div className="px-2 py-3 border-b border-gray-200 flex items-center gap-3">
                  <div className="rounded-full bg-gray-200 p-2">
                    <FaRegUser size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {userInfo?.name}
                    </p>
                    <p className="text-[0.9rem] text-gray-600">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {userOption.map((option) => (
                    <Link
                      key={option.title}
                      to={option.link}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition"
                    >
                      {option.icon}
                      <span className="text-gray-700">{option.title}</span>
                    </Link>
                  ))}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition border-t border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    <span className="text-red-600 font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Tooltip title="Wishlist" arrow>
            {/* using materialUi tooltip  for customized tooltip*/}
            <div className=" p-1.5 rounded-full text-gray-500 hover:bg-gray-200 cursor-pointer">
              <FaRegHeart size={22} />
            </div>
          </Tooltip>

          <Tooltip title="Cart" arrow>
            <div className=" p-1.5 rounded-full text-gray-500 hover:bg-gray-200 cursor-pointer">
              <MdOutlineShoppingCart size={22} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
