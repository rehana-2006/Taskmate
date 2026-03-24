import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Router = createBrowserRouter([
  MainRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default Router;