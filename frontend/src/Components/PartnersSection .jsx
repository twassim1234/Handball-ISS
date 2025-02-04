import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import pic1 from "../Assets/s1.jpg";
import pic2 from "../Assets/s2.png";
import pic3 from "../Assets/s3.png";
import pic4 from "../Assets/s4.jpg";
import pic5 from "../Assets/s5.jpeg";
import pic6 from "../Assets/s6.png";
import pic7 from "../Assets/s7.jpg";
import pic8 from "../Assets/s8.jpg";

const partners = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const PartnersSection = () => {
  const [index, setIndex] = useState(0);
  const totalPartners = partners.length;
  const visibleCount = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % totalPartners);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" h-[32dvh]">
      <div className="text-center mb-8">
        <p className="text-black text-4xl mt-4">Our Partners</p>
        <p className="text-gray-600 mt-4">Join our list of partners</p>
      </div>

      {/* Scrolling Carousel */}
      <div className="overflow-hidden w-full flex justify-center py-6">
        <motion.div
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: `-${index * (100 / visibleCount)}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            width: `${(totalPartners / visibleCount) * 100}%`,
            display: "flex",
          }}
        >
          {partners.concat(partners).map((image, i) => (
            <div key={i} className="flex-shrink-0 w-1/5 flex justify-center items-center">
              <img
                src={image}
                alt={`Partner ${i + 1}`}
                className="h-20 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
