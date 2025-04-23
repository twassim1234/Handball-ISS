import React, { useEffect, useState } from 'react';
import Logo from "../Assets/logonav.jpg";
import menu from "../Assets/menu.png";
import close from "../Assets/close-icon.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <>
      <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        <div className='container mx-auto flex justify-between items-center py-4 px-6'>
          <img src={Logo} alt="Logo" className='h-16 w-80 object-contain' />

          {/* Desktop Menu */}
          <ul className='hidden lg:flex gap-9 text-red-500 text-lg font-medium'>
            <a href="/" className='hover:text-red-700'>Home</a>
            <a href="/teams" className='hover:text-red-700'>Teams</a>
            <a href="/dashboard" className='hover:text-red-700'>Dashboard</a>
            <a href="/matches" className='hover:text-red-700'>Matches</a>
            <a href="/about" className='hover:text-red-700'>About</a>
            <a href="/contact" className='hover:text-red-700'>Contact</a>
          </ul>

          <button className='hidden lg:block bg-black px-8 py-2 rounded-full font-bold text-white'>
            <a href="/login">Login</a>
          </button>

          {/* Mobile Menu Button (visible on sm & md) */}
          <img
            onClick={() => setShowMobileMenu(true)}
            src={menu}
            className="block lg:hidden w-7 cursor-pointer"
            alt='menu'
          />
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 bottom-0 ${showMobileMenu ? 'w-full' : 'w-0'} overflow-hidden bg-white transition-all duration-300`}>
          <div className='flex justify-end p-6'>
            <img onClick={() => setShowMobileMenu(false)} src={close} className='w-6 cursor-pointer' alt='close' />
          </div>
          <ul className='flex flex-col items-center gap-6 mt-5 text-lg font-medium text-red-500'>
            <a onClick={() => setShowMobileMenu(false)} href="/" className='px-4 py-2'>Home</a>
            <a onClick={() => setShowMobileMenu(false)} href="/about" className='px-4 py-2'>About</a>
            <a onClick={() => setShowMobileMenu(false)} href="/projects" className='px-4 py-2'>Projects</a>
            <a onClick={() => setShowMobileMenu(false)} href="/matches" className='px-4 py-2'>Matches</a>
            <a onClick={() => setShowMobileMenu(false)} href="/dashboard" className='px-4 py-2'>Dashboard</a>
            <a onClick={() => setShowMobileMenu(false)} href="/teams" className='px-4 py-2'>Teams</a>
            <button className='bg-black px-8 py-2 rounded-full text-white mt-8 font-bold'>
              <a href='/login'>Login</a>
            </button>
          </ul>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-28"></div>
    </>
  );
};

export default Navbar;
