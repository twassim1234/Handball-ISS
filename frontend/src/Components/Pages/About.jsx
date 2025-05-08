import React from "react";
import { motion } from "framer-motion";
import Logo from "../../Assets/FTHBLogo.png";
import Testimonials from "../../Components/Testimonials.jsx";
const About = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center container mt-40 mb-28
    mx-auto sm:p-4 lg:px-32  w-full overflow-hidden"
        id="About"
      >
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 underline">
          About Us
        </h1>

        <p
          className="text-gray-500 max-w-80 text-center 
      mb-8"
        >
          Passionate About Sport, Dedicated to Your Vision{" "}
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-14">
          <img src={Logo} alt="logo" className="w-full sm:w-1/2 max-w-lg" />

          <div className="flex flex-col  items-center md:items-start mt-10 text-gray-600">
            <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
              <div>
                <p className="text-4xl font-medium text-gray-800">10+</p>
                <p>Leagues</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-gray-800">12+</p>
                <p>stadium</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-gray-800">200+</p>
                <p>Team</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-gray-800">2500+</p>
                <p>Players</p>
              </div>
            </div>
            <p className="my-10 md:min-w-80 max-w-lg">
              {" "}
              The Handball Federation of Tunisia (Fédération Tunisienne de
              Handball - FTHB) is the official governing body for the sport of
              handball in Tunisia. Established in 1957, it oversees the
              development, promotion, and regulation of handball at all levels
              across the country. The federation is responsible for organizing
              national competitions, managing the national teams, and
              representing Tunisia in international tournaments. With a rich
              history of achievements in Africa and beyond, the FTHB plays a key
              role in shaping the future of handball in Tunisia.
            </p>
          </div>
        </div>
      </motion.div>
      <Testimonials/>
    </div>
  );
};

export default About;