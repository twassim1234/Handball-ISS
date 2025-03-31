import { useEffect, useState, useCallback } from "react";
import pic1 from "../Assets/Matche/match.jpg";
import { Link } from "react-router-dom";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";


export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { user } = useContext(UserContext);

  const fetchMatches = async () => {
    const response = await axios.get("http://localhost:8000/matches");
    console.log(response);
    setMatches(response.data.matches);
  }

  useEffect(() => {
    if(!user) return;
    fetchMatches();
  },[user]);

  const [newMatch, setNewMatch] = useState({
    club1: "",
    club2: "",
    match_location: "",
    match_city: "",
    match_date: "",
    status: "new",
    image_url: "",
  });
  
  

  const filteredMatches = matches.filter(
    (match) => filter === "all" || match.status === filter
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatch({
      ...newMatch,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMatch((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in newMatch) {
      formData.append(key, newMatch[key]);
    }

    try {
      const response = await axios.post("http://localhost:8000/matches", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Full response:", response); // Debug log
      
      if (response.status === 201) {
        alert(`Match added successfully! Image URL: ${response.data.image_url}`);
        fetchMatches(); // Refresh the matches list
        setShowForm(false); // Close the form
      }
    } catch (error) {
      console.error("Detailed error:", error.response?.data || error);
      alert(`Failed to add match: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleAddGame = () => {
    setShowForm(true);
  };
const handleCancel = () => {
    setShowForm(false);
    setNewMatch({
      club1: "",
      club2: "",
      match_location: "",
      match_city: "",
      match_date: "",
      status: "new",
      image_url: "",
    });
    setImagePreview("");
  };


  const handleMatchClick=(event)=>{
    if(!user){
      event.preventDefault();
    }
  }

  return (
    <AuthenticationLayout>
     <div className="p-6 md:p-8 lg:p-22">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {["all", "new", "old"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition"
            >
              {status === "all" ? "All Matches" : status === "new" ? "New Matches" : "Old Matches"}
            </button>
          ))}
        </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
  {filteredMatches.map((match) => (
    <Link to={`/match/${match.match_id}`} key={match.match_id} onClick={handleMatchClick} className="p-4 border rounded-lg shadow-md bg-white cursor-pointer">
      <div className="flex justify-center items-center">
        <img
          src={match.image_url ? `http://localhost:8000/uploads/${match.image_url}` : pic1}
          alt={`${match.club1_name} vs ${match.club2_name}`}
          className="lg:w-fit lg:h-60 w-80 h-40 object-cover rounded-lg"
        />
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-center">{match.club1_name} vs {match.club2_name}</h2>
        <p className="text-gray-500 text-center">{match.match_city}</p>
        <p className="text-sm mt-1 text-gray-400 text-center">Date: {match.match_date}</p>
      </div>
    </Link>
  ))}
</div>

      { user && [1,3].includes(user.role_id) &&
        <div className="mt-8 text-center">
        <button onClick={handleAddGame} className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Add New Match
        </button>
      </div>
      }
      
      {showForm && (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-bold mb-4">Add New Match</h3>
          <form onSubmit={handleSubmit}>

          <div className="mb-4">
        <label className="block mb-2">Team 1</label>
        <select name="club1" value={newMatch.club1} onChange={handleInputChange} className="w-full p-2 border rounded" required>
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={club.club_id} value={club.club_id}>
              {club.club_name}
            </option>
          ))}
        </select>
      
      </div>

      <div className="mb-4">
        <label className="block mb-2">Team 2</label>
        <select name="club2" value={newMatch.club2} onChange={handleInputChange} className="w-full p-2 border rounded" required>
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={club.club_id} value={club.club_id}>
              {club.club_name}
            </option>
          ))}
        </select>
      </div>



            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input type="text" name="match_location" value={newMatch.match_location} onChange={handleInputChange}  className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <input type="text" name="match_city" value={newMatch.match_city} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Date</label>
              <input type="datetime-local" name="match_date" value={newMatch.match_date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
            <div className="mb-4">
              <label className="block mb-2">Image</label>
              <input 
                type="file" 
                name="image_url" 
                value={newMatch.image_url}
                onChange={handleImageChange} 
                accept="image/*"
                required
              className="w-full p-2 border rounded" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-40 object-cover rounded-lg" />}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select name="status" value={newMatch.status} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="new">Scheduled</option>
                <option value="new">Ongoing </option>
                <option value="old">Finished</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handleCancel} className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Add Match</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </AuthenticationLayout>
  );
}
