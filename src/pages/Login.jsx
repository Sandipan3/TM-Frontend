import React, { useState } from "react";
import api from "../api/api";
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
      toast.error(resultAction.payload || "Login failed");
    }
  };
  return (
    <section className="flex flex-col gap-y-2 p-5">
      <div className="">
        <h1 className="font-bold text-center text-2xl m-2 p-2">
          Login to your <br />
          <span className="text-purple-500">Task Management</span> Account
        </h1>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex  flex-col justify-center items-center"
      >
        {/* email -> but serves as both username and email*/}
        <div>
          <label htmlFor="email" className="text-xl font-serif">
            Email or Username<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-purple-400 my-1 w-md rounded-md p-2 focus:outline-purple-700"
          />
        </div>
        {/*password */}
        <div className="my-3">
          <label htmlFor="password" className="text-xl font-serif">
            Password<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="border-2 border-purple-400 my-1 w-md rounded-md p-2 focus:outline-purple-700"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-800 text-white w-md rounded-md h-10 cursor-pointer font-sans"
        >
          Login
        </button>
      </form>
      <p className="text-center font-sans my-2 p-1">
        New User?{" "}
        <Link to="/register" className="text-purple-700 ">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
