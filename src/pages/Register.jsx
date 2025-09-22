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
    <section className="flex flex-col gap-y-2">
      <div>
        <h1 className="font-bold text-center text-2xl m-2 p-1">
          Register your <br />
          <span className="text-purple-500">Task Management</span> Account
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex  flex-col justify-center items-center"
      >
        {/* username */}
        <div>
          <label htmlFor="username" className="text-xl font-serif">
            Name<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-purple-400 my-1 w-md rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* email */}
        <div>
          <label htmlFor="email" className="text-xl font-serif">
            Email<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-purple-400 my-1 w-md rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* password */}
        <div className="my-3">
          <label htmlFor="password" className="text-xl font-serif">
            Password<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-purple-400 my-1 w-md rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          className="bg-purple-800 text-white w-md rounded-md h-10 cursor-pointer font-sans"
        >
          Register
        </button>
        <p className="text-center font-sans  my-2 p-1">
          Already a member?{" "}
          <Link to="/login" className="text-purple-700">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
