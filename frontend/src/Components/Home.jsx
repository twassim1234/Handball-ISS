import React from "react";
import PartnersSection from "./PartnersSection ";
import Sondage from "./Sondage";
import Search from "./Search";
import ContactForm from "./ContactForm";
import News from "./News"; 
import ContactSection from "./ContactSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Search />
      <News/>
      <Sondage />
      <ContactSection/>
    </div>
  );
};

export default Home;
