import React, { useState } from "react";
import Logo from "../Assets/logonav.jpg";
import { Link } from "react-router-dom";
import { FaRegWindowClose, FaBars } from "react-icons/fa";
import Login from "./Login";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    if(user){
      localStorage.removeItem("token");
      setUser(undefined);
    }
  }

  const content = (
    <div className="lg:hidden block absolute top-0 left-0 w-full h-screen bg-white z-50 transition-all overflow-hidden">
      <button
        onClick={handleClick}
        className="absolute top-5 right-5 text-red-500 hover:text-red-800 transition"
      >
        <FaRegWindowClose size={30} />
      </button>
  
      <ul className="text-center text-xl p-4 pt-24">
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/">Home</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/teams">Teams</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/matches">Matches</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/about">About</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/contact">Contact us</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-red-800 hover:rounded">
          <a href="/login">Login</a>
        </li>
      </ul>
    </div>
  );
  


  return (
    <nav className="relative">
      <div
        className="h-22 flex justify-between z-50 text-red-500 lg:py-5 
      lg:px-36 md:px-16 px-8 py-8"
      >
        <div className="flex items-center flex-1">
          <span>
            <Link to="/">
            <img src={Logo} alt="Logo" className="w-96" /></Link>
          </span>
        </div>

        <div className="lg:flex hidden lg:flex-1 items-center justify-center font-normal">
  <ul className="flex gap-12 text-[18px]">
    <li className="hover:text-red-800 cursor-pointer">
      <a href="/">Home</a>
    </li>
    <li className="hover:text-red-800 cursor-pointer">
      <a href="/teams">Teams</a>
    </li>

    <li className="hover:text-red-800  cursor-pointer">
      <a href="/dashboard">Dashboard</a>
    </li>
    <li className="hover:text-red-800  cursor-pointer">
      <a href="/matches">Matches</a>
    </li>
    <li className="hover:text-red-800   cursor-pointer">
      <a href="/about">About</a>
    </li>
    <li className="hover:text-red-800 cursor-pointer">
      <a href="/contact">Contact</a>
    </li>
  </ul>

  {/* Login button aligned to the left */}
  <div className="lg:ml-96 bg-red-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-red-800 transition">
      <a href={user?"/":"/login"} onClick={handleLogout}>{user?"Logout":"Login"}</a>
    
  </div>
</div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden  flex items-center">
          <button className="transition" onClick={handleClick}>
            {click ? <FaRegWindowClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {click && content}
    </nav>
  );
};

export default Navbar;