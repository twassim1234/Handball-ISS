import React from 'react';
import pic1 from "../Assets/Players/player.jpg";
import pic2 from "../Assets/Players/player.jpg";
import pic3 from "../Assets/Players/player.jpg";
import star from "../Assets/star_icon.svg";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Ahmed Ben Youssef",
      title: "National Team Player",
      image: pic1,
      alt: "Portrait of Ahmed Ben Youssef",
      rating: 5,
      text: "Representing Tunisia in handball has been a dream come true. The support from the federation and the fans motivates us to give our best every time we step on the court."
    },
    {
      name: "Fatma Jelassi",
      title: "Coach, Women's Youth Team",
      image: pic2,
      alt: "Portrait of Fatma Jelassi",
      rating: 5,
      text: "Working with young talents and watching them grow under the guidance of the federation has been an incredible journey. We're building the future of Tunisian handball."
    },
    {
      name: "Oussama Trabelsi",
      title: "Handball Enthusiast",
      image: pic3,
      alt: "Portrait of Oussama Trabelsi",
      rating: 4,
      text: "I’ve been a fan for years. The level of competition and organization has improved tremendously, and it’s inspiring to see our teams compete at the international level."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='container mx-auto py-10 lg:px-32 w-full mb-20 overflow-hidden'
      id='Testimonials'
    >
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        What They <span className='underline underline-offset-4 decoration-1 font-light'>Say About Us</span>
      </h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Voices from players, coaches, and fans of Tunisian handball
      </p>

      <div className='flex flex-wrap justify-center gap-8'>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center'>
            <img className='w-20 h-20 rounded-full mx-auto mb-4' src={testimonial.image} alt={testimonial.alt} />
            <h2 className='text-xl text-gray-700 font-medium'>{testimonial.name}</h2>
            <p className='text-sm text-gray-500 mb-4'>{testimonial.title}</p>
            <div className='flex justify-center gap-1 text-red-500 mb-4'>
              {Array.from({ length: testimonial.rating }, (_, index) => (
                <img key={index} src={star} alt='star' />
              ))}
            </div>
            <p className='text-gray-600'>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
