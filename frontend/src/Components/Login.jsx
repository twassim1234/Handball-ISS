import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className=" py-20 min-w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-400">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-black font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border rounded-md focus:ring focus:ring-red-400 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="block text-black font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border rounded-md focus:ring focus:ring-red-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center text-black">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" >
              <p className="text-red-500 font-medium hover:underline"> Forgot Password?</p>
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-6 p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-gray-600">
            New here?{" "}
            <Link to="/register">
             <p className="text-red-500 font-medium hover:underline">Create an Account</p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
