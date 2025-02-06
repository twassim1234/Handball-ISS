import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import pic1 from "../Assets/Players/player11.png";
import pic2 from "../Assets/Players/player12.jpg";
import pic3 from "../Assets/Players/player13.jpg";
import pic4 from "../Assets/Players/player14.jpg";

const product = {
  name: "Wassim Trabelsi",
  href: "#",
  images: [
    {
      src: pic1,
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: pic2,
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: pic3,
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: pic4,
      alt: "Model wearing plain white basic tee.",
    },
  ],
  description: "A short description about the person tnajem tekteb li theb lena hhhhhhhhhhh hhhhhhhhhh hhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  highlights: ["High quality", "Comfortable fit", "Stylish design"],
  awards: ["Best player", "Champion 2024", "Pro player"],
  birthday: "1999-01-01",
  heigth: '190',
  placeofbirth: 'tunis',


};

// Utility function to handle conditional class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Image Gallery Component
const ImageGallery = ({ images }) => (
  <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
    <img
      alt={images[0].alt}
      src={images[0].src}
      className=" size-full rounded-lg object-cover"
    />
      <img
      alt={images[1].alt}
      src={images[1].src}
      className="aspect-4/5 w-full h-full object-cover sm:rounded-lg lg:aspect-auto lg:block hidden"
    />
    <img
      alt={images[2].alt}
      src={images[2].src}
      className="aspect-4/5 w-full h-full object-cover sm:rounded-lg lg:aspect-auto lg:block hidden"
    />
  </div>
);

// Product Highlights Component
const ProductHighlights = ({ highlights }) => (
  <div className="mt-10">
    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
    <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
      {highlights.map((highlight) => (
        <li key={highlight} className="text-gray-600">
          {highlight}
        </li>
      ))}
    </ul>
  </div>
);

// Product Awards Component
const ProductAwards = ({ awards }) => (
  <div className="mt-10">
    <h3 className="text-sm font-medium text-gray-900">Awards</h3>
    <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
      {awards.map((award) => (
        <li key={award} className="text-gray-600">
          {award}
        </li>
      ))}
    </ul>
  </div>
);

export default function Example() {
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image Gallery */}
        <ImageGallery images={product.images} />

        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Button */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-red-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Add to bag"
              >
                Modify
              </button>
            </form>
          </div>

          {/* Description & Details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900">{product.description}</p>
            </div>

            {/* Highlights */}
            <ProductHighlights highlights={product.highlights} />

            {/* Awards */}
            <ProductAwards awards={product.awards} />
          </div>
        </div>
      </div>
    </div>
  );
}
