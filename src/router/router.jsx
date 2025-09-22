import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import React from "react";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateTask from "../pages/CreateTask";
import Home from "../pages/Home";
import UpdateTask from "../pages/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      // Public Routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "create", element: <CreateTask /> },
          { path: "update/:title", element: <UpdateTask /> },
          { path: "*", element: <div>Page not found</div> },
        ],
      },
    ],
  },
]);

export default router;
