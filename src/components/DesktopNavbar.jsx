import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/authSlice";

const DesktopNavbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="flex items-center justify-between min-h-[60px] bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 shadow-lg">
      <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
      <ul className="flex items-center gap-12">
        <li>
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/create"
            className="text-lg font-medium hover:text-blue-200 transition-colors duration-200"
          >
            Create
          </Link>
        </li>
        <li>
          <button
            onClick={() => dispatch(logoutUser())}
            className="text-lg font-medium hover:text-red-300 transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
