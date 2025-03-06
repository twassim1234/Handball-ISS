import ContactForm from "../Sections/ContactForm"; 
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const Contact = () => {
  return (
    <div className="py-8">
      <ContactForm/>
    </div>
  );
};

export default Contact;