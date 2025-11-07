import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "../layouts/NavBar";
import Login from "../components/NavBarComponent/Login";
import Register from "../components/NavBarComponent/Register";
import AuthModal from "../utils/AuthModal";

const AppRouter: React.FC = () => {
  
const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar/>,
        errorElement: <div>Error loading search bar</div>,
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement: <div>Error loading login page</div>,
    },
    {
      path: "/register",
      element: <Register/>,
      errorElement: <div>Error loading register page</div>,
    },
    {
      path: "/modal",
      element: <AuthModal/>,
      errorElement: <div>Error loading modal</div>,
    }
]);

  return <RouterProvider router={router} />;
}

export default AppRouter;