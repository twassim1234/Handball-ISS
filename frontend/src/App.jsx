import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<h1>Forgot Password Page</h1>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        
      </Routes>
    </Router>
    </div>
  );
};

export default App;
