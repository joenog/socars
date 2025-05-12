import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import CarDetail from "../pages/car";
import NotFound from "../pages/notfound";
import NewCar from "../pages/dashboard/new";
import { Private } from "./Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Private> <Dashboard /> </Private>,
      },
      {
        path: "/dashboard/new",
        element: <Private> <NewCar /> </Private>,
      },
      {
        path: "/car/:id",
        element: <CarDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
