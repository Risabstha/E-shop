import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo_light.png";
import Login from "../components/NavBarComponent/Login";
import Register from "../components/NavBarComponent/Register";
import SearchBar from "../components/NavBarComponent/SearchBar";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="hidden lg:flex justify-between px-10 py-3 items-center bg-white shadow-md">
      <img
        src={logo}
        alt="Logo"
        className=" w-[13rem] mx-4 my-2"
      />
      <SearchBar />
      <div className="flex gap-x-7 items-center">
        <div className="flex gap-x-2 text-lg">
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          <div>|</div>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </div>

        <div className="" >
          <FaRegHeart size={22} />
        </div>
        <div>
          <MdOutlineShoppingCart size={22}/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
