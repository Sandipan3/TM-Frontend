import React, { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", {
        username,
        email,
        password,
      });
      console.log(res.data.data.message);
      if (res.data.status === "success") {
        toast.success(res.data.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-y-4 p-4 sm:p-6 min-h-screen">
      <div className="text-center">
        <h1 className="font-bold text-xl sm:text-2xl m-2 p-2">
          Register your <br />
          <span className="text-purple-500">Task Management</span> Account
        </h1>
      </div>
      <div className="w-full max-w-xs sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-4"
        >
          {/* username */}
          <div className="w-full">
            <label htmlFor="username" className="text-lg sm:text-xl font-serif">
              Name<span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Bob"
              className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
            />
          </div>
          {/* email */}
          <div className="w-full">
            <label htmlFor="email" className="text-lg sm:text-xl font-serif">
              Email<span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="bob@example.com"
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
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
            />
          </div>
          {/* submit */}
          <button
            type="submit"
            className="bg-purple-800 text-white w-full rounded-md h-10 cursor-pointer font-sans hover:bg-purple-900 transition"
          >
            Register
          </button>
        </form>
      </div>
      <p className="text-center font-sans my-2 p-1 text-sm sm:text-base">
        Already a member?{" "}
        <Link to="/login" className="text-purple-700 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
