import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import pic1 from "../Assets/Players/player11.png";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

// Image Gallery Component
const ImageGallery = ({ images }) => (
  <div className="mx-auto mt-6 max-w-2xl p-4 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 pt-8">
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
  const { id } = useParams(); // Get player ID from the URL
  const [p, setP] = useState({
    name: "",
    images: [{ src: pic1, alt: "Profile picture" }], // Default image
    description: "",
    highlights: [],
    awards: [],
    birthday: "",
    height: "",
    ref: "",
    placeofbirth: "",
    qualification: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempP, setTempP] = useState({ ...p });
  const [showCertForm, setShowCertForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    additionalInfo: "",
    files: [],
  });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch player data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get(`http://localhost:8000/player/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const playerData = response.data;

        // Map the API response to the component state
        setP({
          name: playerData.player_name,
          images: [
            {
              src: playerData.image
                ? playerData.image.startsWith("http")
                  ? playerData.image
                  : `http://localhost:8000/uploads/${playerData.image}`
                : pic1, // Fallback to default image
              alt: "Profile picture",
            },
          ],
          description: playerData.description || "",
          highlights: playerData.highlights ? playerData.highlights.split(",") : [],
          awards: playerData.awards ? playerData.awards.split(",") : [],
          birthday: playerData.birthday || "",
          height: playerData.height || "",
          ref: playerData.reference || "",
          placeofbirth: playerData.place_of_birth || "",
          qualification: playerData.qualified ? "Yes" : "No",
        });

        setTempP({
          name: playerData.player_name,
          images: [
            {
              src: playerData.image
                ? playerData.image.startsWith("http")
                  ? playerData.image
                  : `http://localhost:8000/uploads/${playerData.image}`
                : pic1,
              alt: "Profile picture",
            },
          ],
          description: playerData.description || "",
          highlights: playerData.highlights ? playerData.highlights.split(",") : [],
          awards: playerData.awards ? playerData.awards.split(",") : [],
          birthday: playerData.birthday || "",
          height: playerData.height || "",
          ref: playerData.reference || "",
          placeofbirth: playerData.place_of_birth || "",
          qualification: playerData.qualified ? "Yes" : "No",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching player:", error);
        setError("Failed to load player data. Please try again.");
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setTempP({ ...tempP, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fieldName = e.target.name; // Get the field name from the input
  
    // Store the file along with its field name
    const updatedFiles = files.map((file) => ({
      file, // Store the File object directly
      name: fieldName,
    }));
  
    setFormData({ ...formData, files: [...formData.files, ...updatedFiles] });
  };

  // Handle Save & Edit Toggle
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }

      // Format the birthday field to YYYY-MM-DD
      const formattedBirthday = tempP.birthday ? new Date(tempP.birthday).toISOString().split('T')[0] : null;

      // Prepare the payload for the API
      const payload = {
        player_name: tempP.name,
        height: tempP.height,
        reference: tempP.ref,
        birthday: formattedBirthday, // Use the formatted date
        place_of_birth: tempP.placeofbirth,
        description: tempP.description,
        position: tempP.position,
        qualified: tempP.qualification === "Yes" ? 1 : 0,
        club_id: tempP.club_id,
      };

      console.log("Payload:", payload); // Log the payload

      // Send the update request to the backend
      const response = await axios.put(
        `http://localhost:8000/player/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Backend Response:", response.data); // Log the backend response

      if (response.status === 200) {
        alert("Player updated successfully!");
        setP(tempP); // Update the state with the new data
        setIsEditing(false); // Exit edit mode
      } else {
        setError("Failed to update player. Please try again.");
      }
    } catch (error) {
      console.error("Error updating player:", error);
      if (error.response) {
        // Backend returned an error response
        setError(error.response.data.error || "Failed to update player. Please try again.");
      } else {
        // Network or other errors
        setError("Failed to update player. Please check your connection and try again.");
      }
    }
  };

  // Handle Dynamic Fields (Highlights & Awards)
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

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone_number', formData.phoneNumber);
  
    // Append files with the correct field names
    formData.files.forEach((file) => {
      formDataToSend.append(file.name, file.file); // Use the file's name as the field name
    });
  
    // Debug: Log the FormData object
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }
  
      const response = await axios.post('http://localhost:8000/qualification-request', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        alert("Qualification request submitted successfully!");
        setShowCertForm(false);
      } else {
        setError("Failed to submit qualification request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting qualification request:", error);
      setError("Failed to submit qualification request. Please check your connection and try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <Link to="/teams" className="pl-36 text-red-500 mt-4 inline-block">
          ← Back to Teams
        </Link>

        <ImageGallery images={p.images} />

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8">
          

          <div className="mt-4 lg:row-span-3">
            {["name","description","height", "ref", "birthday", "placeofbirth"].map((field) => (
              
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

          
        </div>

        {/* Qualification Request Section */}
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
                value={formData.fullName}
                onChange={handleFormChange}
                className="w-full p-2 border mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-2 border mb-2"
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">
                Upload extrait de naissance:
              </label>
              <input
                type="file"
                name="extrait_de_naissance"
                onChange={handleFileChange}
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">
                Upload Autorisation parentale:
              </label>
              <input
                type="file"
                name="autorisation_parentale"
                onChange={handleFileChange}
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">
                Upload CIN Scolaire:
              </label>
              <input
                type="file"
                name="cin_scolaire"
                onChange={handleFileChange}
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">Upload photo:</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="w-full p-2 border mb-2"
              />
              <label className="block font-medium mb-1">
                Upload Extrait de paiement:
              </label>
              <input
                type="file"
                name="extrait_de_payment"
                onChange={handleFileChange}
                className="w-full p-2 border mb-2"
              />

              <div className="flex items-start mb-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="/TermsAndConditions" className="text-blue-500 underline">
                    terms and conditions
                  </a>
                  .
                </label>
              </div>

              <button
                className={`w-76 p-2 text-white rounded ${
                  accepted ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!accepted}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowCertForm(false)}
                className="w-76 pl-2 bg-red-500 text-white p-2 rounded hover:bg-red-700"
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
