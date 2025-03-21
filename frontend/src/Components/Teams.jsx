import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: "", descreption: "", extrainfo: "", imageSrc: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);
  useEffect(() => {
    console.log("Teams state:", teams); // Log the teams state
  }, [teams]);
 
  const fetchTeams = async () => {
    setTeams([]); // Clear old state before fetching new data
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8000/clubs/pic", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Backend response:", response.data); // Log the backend response
  
      setTimeout(() => {
        setTeams(
          response.data.clubs.map((club) => ({
            id: club.club_id, // Use the club_id from the backend
            name: club.club_name,
            descreption: "Club in the league",
            imageSrc: club.club_picture.startsWith("http")
              ? club.club_picture
              : `http://localhost:8000/uploads/${club.club_picture}`,
            imageAlt: club.club_name,
          }))
        );
      }, 100);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError("Failed to load teams. Please try again.");
    }
  };
  

  const handleModifyClick = () => setIsModifyMode(!isModifyMode);

  const handleEdit = (team) => {
    setIsEditing(true);
    setCurrentTeam(team);
    setFormData({ ...team });
    setImagePreview(team.imageSrc);
  };

  const handleDelete = async (id) => {
    console.log("Deleting club with ID:", id); // Log the ID being passed
  
    if (!id) {
      console.error("Invalid ID:", id);
      setError("Invalid team ID. Please try again.");
      return;
    }
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8000/club/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setTeams(teams.filter((team) => team.id !== id));
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      setError("Failed to delete team. Please try again.");
    }
  };
  
  

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({ id: teams.length + 1, name: "", descreption: "", extrainfo: "", imageSrc: "" });
    setImagePreview("");
  };

  const handleSaveEdit = () => {
    setTeams(teams.map((team) => (team.id === currentTeam.id ? { ...formData } : team)));
    setIsEditing(false);
  };

  const handleAddTeam = async () => {
    if (formData.name && formData.descreption && formData.first_name && formData.last_name && formData.imageFile) {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append("club_name", formData.name);
      formDataToSend.append("club_details", formData.descreption);
      formDataToSend.append("extra_details", formData.extrainfo);
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("club_picture", formData.imageFile);
  
      try {
        const response = await axios.post("http://localhost:8000/club/post", formDataToSend, {
          headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data"
          },
        });
  
        if (response.status === 201) {
          setIsAdding(false);
          fetchTeams(); // 🆕 Force UI to refresh and display the new team
        }
      } catch (error) {
        console.error("Error adding team:", error);
        setError("Failed to add team. Please try again.");
      }
    } else {
      setError("All fields are required.");
    }
  };
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setFormData({ id: null, name: "", descreption: "", extrainfo: "", imageSrc: "" });
    setImagePreview("");
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });



  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:text-4xl md:text-4xl text-2xl font-bold text-red-500 flex justify-center pb-16">
          THE TEAMS OF THE LEAGUE
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12">
          {teams.map((team) => (
            <div key={team.id} className="group">
              <Link to={`/team/${team.id}`} className="flex justify-center">
              <img alt={team.imageAlt} src={`${team.imageSrc}?t=${new Date().getTime()}`} className="max-w-80 px-12 h-60 rounded-lg object-cover group-hover:opacity-45" />

              </Link>
              <h2 className="mt-4 text-3xl flex justify-center font-bold text-red-500">{team.name}</h2>
              <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">{team.descreption}</p>
              {team.extrainfo && <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">{team.extrainfo}</p>}
              <Link to={`/team/${team.id}`} className="text-red-500 flex justify-center mt-3 font-medium">
                More details →
              </Link>

              {isModifyMode && (
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleDelete(team.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center pt-16 gap-4">
          <button onClick={handleModifyClick} className={`px-6 py-3 font-medium rounded-md ${isModifyMode ? "bg-gray-500 text-white" : "bg-red-500 text-white hover:bg-red-800"}`}>
            {isModifyMode ? "Done" : "Modify"}
          </button>
          {isModifyMode && (
            <button onClick={handleAddNew} className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-800">
              Add Team
            </button>
          )}
        </div>

        {(isEditing || isAdding) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Team" : "Add New Team"}</h2>
              <input type="text" name="first_name" placeholder="Admin First Name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border mb-2 rounded"/>
              <input type="text" name="last_name" placeholder="Admin Last Name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="text" name="name" placeholder="Team Name" value={formData.name} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="text" name="descreption" placeholder="Description" value={formData.descreption} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="text" name="extrainfo" placeholder="Extra Info (optional)" value={formData.extrainfo} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="file" onChange={handleImageChange} className="w-full p-2 border mb-2 rounded" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />}
              <div className="flex justify-between mt-4">
                <button onClick={isEditing ? handleSaveEdit : handleAddTeam} className="px-4 py-2 bg-blue-500 text-white rounded">{isEditing ? "Save" : "Add"}</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
