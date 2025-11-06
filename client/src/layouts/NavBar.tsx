import logo from "../assets/logo_light.png";
import Login from "../components/NavBarComponent/Login";
import Register from "../components/NavBarComponent/Register";
import SearchBar from "../components/NavBarComponent/SearchBar"



const NavBar = () => {
  return (
    <div className="flex">
      <img src={logo} alt="Logo" className=" min-w-[8rem] w-[12vw] max-w-[15rem] mx-4 my-2"/>
      <SearchBar />
      <div>
         <Login/>
      <Register/>     
      </div>

    </div>
  )
}

export default NavBar
