import React, { useState } from "react";
import Logo from "../Assets/FTHBLogo.png";
import { Link } from "react-router-dom";
import { FaRegWindowClose, FaBars } from "react-icons/fa";
import Login from "./Login";
const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div
      className="lg:hidden block absolute top-16 w-full left-0 right-0 
      bg-red-500 transition"
    >
      <ul className="text-center text-xl p-4">
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/home">Home</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/teams">Teams</a>
        </li>
    
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/juries">Juries</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/matches">Matches</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/about">About</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/contact">Contact us</a>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
          <a href="/">Login</a>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="relative bg-black">
      <div
        className="h-20 flex justify-between z-50 text-red-500 lg:py-5 
      lg:px-28 md:px-16 px-8 py-8"
      >
        <div className="flex items-center flex-1">
          <span>
            <img src={Logo} alt="Logo" className="w-20" />
          </span>
        </div>

        <div className="lg:flex hidden lg:flex-1 items-center justify-center font-normal">
  <ul className="flex gap-12 text-[18px]">
    <li className="hover:text-red-800 cursor-pointer">
      <a href="/home">Home</a>
    </li>
    <li className="hover:text-red-800 cursor-pointer">
      <a href="/teams">Teams</a>
    </li>

    <li className="hover:text-red-800  cursor-pointer">
      <a href="/juries">Juries</a>
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
      <a href="/">Login</a>
    
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

/*

*/
