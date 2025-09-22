import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectCurrentLoading,
  selectCurrentError,
} from "../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCurrentLoading);
  const error = useSelector(selectCurrentError);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully");
      navigate("/");
    } else if (login.rejected.match(resultAction)) {
      toast.error(resultAction.payload);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-y-4 p-4 sm:p-6 min-h-screen">
      <div className="text-center">
        <h1 className="font-bold text-xl sm:text-2xl m-2 p-2">
          Login to your <br />
          <span className="text-purple-500">Task Management</span> Account
        </h1>
      </div>
      <div className="w-full max-w-xs sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-4"
        >
          {/* email -> but serves as both username and email */}
          <div className="w-full">
            <label htmlFor="email" className="text-lg sm:text-xl font-serif">
              Email or Username<span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email or Username"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
            />
          </div>
          {/* password */}
          <div className="w-full">
            <label htmlFor="password" className="text-lg sm:text-xl font-serif">
              Password<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-800 text-white w-full rounded-md h-10 cursor-pointer font-sans hover:bg-purple-900 transition"
          >
            Login
          </button>
        </form>
      </div>
      <p className="text-center font-sans my-2 p-1 text-sm sm:text-base">
        New User?{" "}
        <Link to="/register" className="text-purple-700 hover:underline">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
