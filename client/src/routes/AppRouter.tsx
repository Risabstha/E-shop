import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "../layouts/NavBar";

const AppRouter: React.FC = () => {
  
const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar/>,
        errorElement: <div>Error loading search bar</div>,
    }
]);

  return <RouterProvider router={router} />;
}

export default AppRouter;