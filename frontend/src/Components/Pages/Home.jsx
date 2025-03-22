import React from "react";
import PartnersSection from "../PartnersSection ";
import Sondage from "../Sondage";
import Search from "../Sections/Search";
import ContactForm from "../Sections/ContactForm";
import News from "../News"; 
import ContactSection from "../Sections/ContactSection";
import { Link } from "react-router-dom";
import AuthenticationLayout from "../../Layouts/AuthenticationLayout";

const Home = () => {
  return (
    <AuthenticationLayout>
    <div className="min-h-fit ">
      <Search />
      <News/>
      <Sondage />
      <ContactSection/>
    </div>
    </AuthenticationLayout>
  );
};

export default Home;
