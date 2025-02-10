import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import pic1 from "../Assets/Players/player11.png";
import pic2 from "../Assets/Players/player12.jpg";
import pic3 from "../Assets/Players/player13.jpg";
import pic4 from "../Assets/Players/player14.jpg";
import { Link } from "react-router-dom";

const initialP = {
  name: "Wassim Trabelsi",
  href: "#",
  images: [
    { src: pic1, alt: "Two each of gray, white, and black shirts laying flat." },
    { src: pic2, alt: "Model wearing plain black basic tee." },
    { src: pic3, alt: "Model wearing plain gray basic tee." },
  ],
  description: "A short description about the person...",
  highlights: ["High quality", "Comfortable fit", "Stylish design"],
  awards: ["Best player", "Champion 2024", "Pro player"],
  birthday: "1999-01-01",
  height: "190",
  ref: "190b0",
  placeofbirth: "Tunis",
  professional: "Yes",

};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Image Gallery Component
const ImageGallery = ({ images }) => (
  <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 pt-8">
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

const PHighlights = ({ highlights }) => (
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

const PAwards = ({ awards }) => (
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
  const [p, setP] = useState(initialP);
  const [isEditing, setIsEditing] = useState(false);
  const [tempP, setTempP] = useState(initialP);

  const handleChange = (e) => {
    setTempP({ ...tempP, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...tempP[field]];
    updatedArray[index] = value;
    setTempP({ ...tempP, [field]: updatedArray });
  };

  const handleAddItem = (field) => {
    setTempP({ ...tempP, [field]: [...tempP[field], ""] });
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = tempP[field].filter((_, i) => i !== index);
    setTempP({ ...tempP, [field]: updatedArray });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setP(tempP);
    setIsEditing(false);
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <ImageGallery images={p.images} />

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={tempP.name}
                onChange={handleChange}
                className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl border p-2 w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {p.name}
              </h1>
            )}
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {["height", "ref", "birthday", "placeofbirth"].map((field, index) => (
              <div key={index} className="pt-6">
                <p className="text-2xl font-bold text-red-500">{field.replace(/([A-Z])/g, " $1")}:</p>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={tempP[field]}
                    onChange={handleChange}
                    className="text-xl tracking-tight text-black font-bold pt-2 border p-2 w-full"
                  />
                ) : (
                  <p className="text-xl tracking-tight text-black font-bold pt-2">
                    {p[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-6">
              <p className="text-2xl font-bold text-red-500">Professional:</p>
              {isEditing ? (
                <select
                  name="professional"
                  value={tempP.professional}
                  onChange={handleChange}
                  className="text-xl font-bold border p-2 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <p className="text-xl font-bold pt-2">{p.professional}</p>
              )}
            </div>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-800"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-red-800"
              >
                Modify
              </button>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={tempP.description}
                  onChange={handleChange}
                  className="text-base text-gray-900 border p-2 w-full"
                />
              ) : (
                <p className="text-base text-gray-900">{p.description}</p>
              )}
            </div>

            <div>
              <h2 className="font-bold mt-4">Highlights:</h2>
              {tempP.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleArrayChange("highlights", index, e.target.value)}
                        className="border p-2 w-full"
                      />
                      <button onClick={() => handleRemoveItem("highlights", index)} className="bg-red-500 text-white p-2">X</button>
                    </>
                  ) : (
                    <p>{highlight}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => handleAddItem("highlights")} className="bg-blue-500 text-white p-2 mt-2">Add Highlight</button>
              )}
            </div>

            <div>
              <h2 className="font-bold mt-4">Awards:</h2>
              {tempP.awards.map((award, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={award}
                        onChange={(e) => handleArrayChange("awards", index, e.target.value)}
                        className="border p-2 w-full"
                      />
                      <button onClick={() => handleRemoveItem("awards", index)} className="bg-red-500 text-white p-2">X</button>
                    </>
                  ) : (
                    <p>{award}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => handleAddItem("awards")} className="bg-blue-500 text-white p-2 mt-2">Add Award</button>
              )}
              
            </div>
            
          </div>
          <div>
      <Link to="/teams" className="text-red-500 mt-4 inline-block">
          ← Back to Teams
        </Link></div>
        </div>
        
      </div>
      
    </div>
  );
}
