import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../slice/authSlice";
import { useDispatch } from "react-redux";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight">Task Management</h1>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-2xl z-50 flex flex-col p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="self-end mb-8 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <X size={28} />
            </button>
            <ul className="flex flex-col gap-8 text-lg font-medium">
              <li
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-300 transition-colors duration-200"
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-300 transition-colors duration-200"
              >
                <Link to="/create">Create</Link>
              </li>
              <li
                onClick={() => {
                  dispatch(logoutUser());
                  setIsOpen(false);
                }}
                className="hover:text-red-300 transition-colors duration-200"
              >
                Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavbar;
