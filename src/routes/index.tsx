import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import CarDetail from "../pages/car";
import NotFound from "../pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/cardetail",
        element: <CarDetail />
      },
    ]
  },
    {
      path: "*",
      element: <NotFound />
    },
])

export default router;