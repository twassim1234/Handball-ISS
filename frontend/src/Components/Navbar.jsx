import React from "react";
import Logo from "../Assets/FTHBLogo.png";
import { Link } from "react-router-dom";

import Home from "./Home";

const Navbar = () => {
  const content = (
    <>
      <div>
        <ul>
          <Link to="Home">
            <li>Home</li>
          </Link>
          <Link>
            <li>Teams</li>
          </Link>

          <Link>
            <li>Player</li>
          </Link>
          <Link>
            <li>Matches</li>
          </Link>
          <Link>
            <li>About</li>
          </Link>
          <Link>
            <li>Contact us</li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div
        className="h-20 flex justify-between z-50 text-red-400 lg:py-5 
      px-20 py-4 "
      >
        <div className="flex items-center flex-1 ">
          <span>
            <img src={Logo} alt="Logo" className="w-20" />
          </span>
        </div>
        <div
          className="lg:flex md:flex lg:flex-1 items-center justift-end
         font-normal"
        >
          <div className="flex- gap-8 mr-16 text-[18px">
            <ul>
            <li>Home</li>

              <li>Teams</li>

              <li>Player</li>

              <li>Matches</li>

              <li>About</li>

              <li>Contact us</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
