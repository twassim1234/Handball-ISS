// components/FinalCallToAction.js
import React from "react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="mb-16 px-6 py-16 bg-gray-50">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl font-semibold mb-4 leading-tight">
          Let us help and guide you during your journey
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Join us and make Tunisian sport a better place.
        </p>
        <Link to="/contact">
          <button
            type="button"
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
          >
            Contact US
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
