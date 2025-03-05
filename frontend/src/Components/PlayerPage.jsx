import { useState } from "react";
import { Link } from "react-router-dom";
import pic1 from "../Assets/Players/player11.png";
import pic2 from "../Assets/Players/player12.jpg";
import pic3 from "../Assets/Players/player13.jpg";
import pic4 from "../Assets/Players/player14.jpg";
import TermsAndConditions from "./TermsAndConditions";

const initialP = {
  name: "Wassim Trabelsi",
  images: [
    { src: pic1, alt: "Profile picture 1" },
    { src: pic2, alt: "Profile picture 2" },
    { src: pic3, alt: "Profile picture 3" },
  ],
  description: "A short description about the person...",
  highlights: ["High quality", "Comfortable fit", "Stylish design"],
  awards: ["Best player", "Champion 2024", "Pro player"],
  birthday: "1999-01-01",
  height: "190",
  ref: "190b0",
  placeofbirth: "Tunis",
  qualification: "Yes",
};

const classNames = (...classes) => classes.filter(Boolean).join(" ");

// Image Gallery Component
const ImageGallery = ({ images }) => (
  <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 pt-8">
    {images.map((image, index) => (
      <img
        key={index}
        alt={image.alt}
        src={image.src}
        className="w-full h-full rounded-lg object-cover"
      />
    ))}
  </div>
);

export default function PlayerProfile() {
  const [p, setP] = useState(initialP);
  const [isEditing, setIsEditing] = useState(false);
  const [tempP, setTempP] = useState(initialP);
  const [showCertForm, setShowCertForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    additionalInfo: "",
    files: [],
  });


  // lel submit button
  const [accepted, setAccepted] = useState(false);


  // Handle Input Change
  const handleChange = (e) => {
    setTempP({ ...tempP, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: [...e.target.files] });
  };

  // Handle Save & Edit Toggle
  const handleSave = () => {
    setP(tempP);
    setIsEditing(false);
  };

  // Handle Dynamic Fields (Highlights & Awards)
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...tempP[field]];
    updatedArray[index] = value;
    setTempP({ ...tempP, [field]: updatedArray });
  };

  const handleRequestClick = () => setIsMode(!isModifyMode);


  const handleAddItem = (field) => {
    setTempP({ ...tempP, [field]: [...tempP[field], ""] });
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = tempP[field].filter((_, i) => i !== index);
    setTempP({ ...tempP, [field]: updatedArray });
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <Link to="/teams" className="pl-36 text-red-500 mt-4 inline-block">
          ← Back to Teams
        </Link>

        <ImageGallery images={p.images} />

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8">
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

          <div className="mt-4 lg:row-span-3">
            {["height", "ref", "birthday", "placeofbirth"].map((field) => (
              <div key={field} className="pt-6">
                <p className="text-2xl font-bold text-red-500">
                  {field.replace(/([A-Z])/g, " $1")}:
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={tempP[field]}
                    onChange={handleChange}
                    className="text-xl font-bold border p-2 w-full"
                  />
                ) : (
                  <p className="text-xl font-bold pt-2">{p[field]}</p>
                )}
              </div>
            ))}
            <div className="pt-6">
              <p className="text-2xl font-bold text-red-500">Qualification:</p>
              {isEditing ? (
                <select
                  name="qualification"
                  value={tempP.qualification}
                  onChange={handleChange}
                  className="text-xl font-bold border p-2 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <p className="text-xl font-bold pt-2">{p.qualification}</p>
              )}
            </div>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="mt-10 w-full bg-green-500 text-white p-3 rounded hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-10 w-full bg-red-500 text-white p-3 rounded hover:bg-red-700"
              >
                Modify
              </button>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8">
            <h2 className="font-bold">Description</h2>
            {isEditing ? (
              <textarea
                name="description"
                value={tempP.description}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p>{p.description}</p>
            )}

            <h2 className="font-bold mt-4">Highlights</h2>
            {tempP.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mt-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        handleArrayChange("highlights", index, e.target.value)
                      }
                      className="border p-2 w-full"
                    />
                    <button
                      onClick={() => handleRemoveItem("highlights", index)}
                      className="bg-red-500 text-white p-2"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <p>{highlight}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => handleAddItem("highlights")}
                className="bg-blue-500 text-white p-2 mt-2"
              >
                Add Highlight
              </button>
            )}
          </div>
        </div>

        <div className="bg-white flex items-center justify-center p-6">
          <button
            onClick={() => setShowCertForm(!showCertForm)}
            className="flex mt-10 w-1/4 bg-red-500 text-white p-3 rounded hover:bg-red-700"
          >
            Request Qualification
          </button>

          {showCertForm && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 border p-4 rounded"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-2 border mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border mb-2"
              />
              <input
                type="number"
                name="number"
                placeholder="phone number"
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">
                Upload extrait de nessance:
              </label>
              <input type="file" multiple className="w-full p-2 border mb-2" />

              <label className="block font-medium mb-1">
                Upload Autorisation parental:
              </label>
              <input type="file" multiple className="w-full p-2 border mb-2" />

              <label className="block font-medium mb-1">
                Upload CIN Scholaire:
              </label>
              <input type="file" multiple className="w-full p-2 border mb-2" />

              <label className="block font-medium mb-1">Upload photo:</label>
              <input type="file" multiple className="w-full p-2 border mb-2" />
              <label className="block font-medium mb-1">
                Upload Exstrait de payment:
              </label>
              <input type="file" multiple className="w-full p-2 border mb-2" />

              <div className="flex items-start mb-3">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 mr-2"
          checked={accepted}
          onChange={() => setAccepted(!accepted)}
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the <a href="/TermsAndConditions" className="text-blue-500 underline">terms and conditions</a>.
        </label>
      </div>




      <button
        className={`w-76 p-2 text-white rounded ${accepted ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!accepted}
        onClick={() => setShowCertForm(false)}

      >
        Submit
      </button>
              <button
                type="button"
                onClick={() => setShowCertForm(false)}
                className=" w-76 pl-2 bg-red-500 text-white p-2 rounded  hover:bg-red-700"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
