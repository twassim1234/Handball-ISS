import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // API requests

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/login", { email, password });

      if (response.status === 200) {
        const { token, admin } = response.data;
        
        // Store token in localStorage or sessionStorage
        localStorage.setItem("token", token);

        console.log("Login successful:", response.data);
        navigate("/home"); // Redirect after login
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="py-20 min-w-fit flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-400">Login</h2>
        
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="email" className="block text-black font-medium">Email</label>
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

          <div className="mt-4">
            <label htmlFor="password" className="block text-black font-medium">Password</label>
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
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
