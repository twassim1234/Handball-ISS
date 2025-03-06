import React from "react";
import PartnersSection from "../PartnersSection ";
import Sondage from "../Sondage";
import Search from "../Sections/Search";
import ContactForm from "../Sections/ContactForm";
import News from "../News"; 
import ContactSection from "../Sections/ContactSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-fit ">
      <Search />
      <News/>
      <Sondage />
      <ContactSection/>
    </div>
  );
};

export default Home;
