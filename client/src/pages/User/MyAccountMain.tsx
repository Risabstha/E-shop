import MyAccount from "../../components/userCompnents/MyAccount";
import UserMenu from "../../components/userCompnents/UserMenu";
import NavBar from "../../layouts/NavBar";

const MyAccountMain = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full min-h-screen bg-[#f5f0f0] pt-35 pb-12 hidden lg:grid lg:grid-cols-3 lg:gap-6 px-4 md:px-8 lg:px-16 ">
      <div className="lg:col-span-1 ">
        <UserMenu />
      </div>
      <div className="lg:col-span-2 ">
        <MyAccount />
      </div>
    </div>
    </div>
    
  );
};

export default MyAccountMain;

// activeTab === item.id
//   ? "bg-red-50 border-l-4 border-red-500 text-red-600 font-semibold"
