import React from "react";
import { FaTwitter, FaFacebookF , FaInstagram } from "react-icons/fa"; // Import icons
import Logo from "../Assets/FTHBLogo.png"; 
const Footer = () => {
  return (
    <footer className="bg-gray-200 py-9">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left side: Text and Social Icons */}
        <div className="mb-8 md:mb-0 max-w-xs md:max-w-92 lg:max-w-92">
          <p className="text-lg font-bold mb-2">
          Fédération tunisienne de Handball
          </p>
          <p>
          Adresse : 11, Rue 1er juin – Impasse de l’Aurore – Mutuelle Ville – 1002 Tunis – B.P. 151 – 1002 Tunis Belvédère
          </p>
          <p className="mt-12 text-lg font-semibold">  Follow us</p>
          <div className="flex space-x-3 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="relative group">
              <FaTwitter className="text-xl hover:text-gray-300" />
            </a>
            <a href="https://www.facebook.com/federation.tunisienne.handball/" target="_blank" rel="noopener noreferrer" className="relative group">
              <FaFacebookF  className="text-xl hover:text-gray-300" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="relative group">
              <FaInstagram className="text-xl hover:text-gray-300" />
            </a>
            
          </div>
        </div>

        {/* Right side: Logo */}
        <div className="mb-8 md:mb-0">
        <img src={Logo} alt="FTHB Logo" className="w-48 md:w-64" />
        </div>
      </div>

      {/* Middle: Navigation */}
      <nav className="flex justify-center items-center space-x-2 mt-6 flex-wrap">
        <a className="text-red-500 font-medium  text-md hover:underline focus:underline" href="/home">Home</a>
        <span className="text-sm">•</span>
        <a className="text-red-500 font-medium  text-md hover:underline focus:underline" href="/about">About</a>
        <span className="text-sm">•</span>
        <a className="text-red-500 font-medium  text-md hover:underline focus:underline" href="/contact">Contact us</a>
        <span className="text-sm">•</span>
        <a className="text-red-500 font-medium  text-md hover:underline focus:underline" href="/TermsAndConditions">Terms of Services</a>
        <span className="text-sm">•</span>
        <a className="text-red-500 font-medium  text-md hover:underline focus:underline" href="/privacy">Privacy Policy</a>
      </nav>

      <p className="text-center mt-4 text-sm">Copyright © Wassim </p>
    </footer>
  );
};

export default Footer;
