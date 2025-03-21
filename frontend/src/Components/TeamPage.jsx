import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../Assets/Teams/club.png";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    player_name: "",
    height: "",
    reference: "",
    image: "",
    birthday: "",
    place_of_birth: "",
    description: "",
    position: "",
    qualified: false,
    club_id: id, // Use the team ID from the URL
  });
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for update

  useEffect(() => {
    if (id) {
      fetchTeam(id);
    }
  }, [id]);
  useEffect(() => {
    console.log("Players after fetching team:", players);
  }, [players]);

  const fetchTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }
      const response = await axios.get(`http://localhost:8000/club/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeam(response.data);
      setPlayers(response.data.players.map(player => ({ 
        id: player.player_id, // Ensure it matches backend ID
        name: player.name, 
        role: player.role, 
        image: player.image 
      })));
      
    } catch (error) {
      console.error("Error fetching team details:", error);
      setError("Failed to load team details. Please try again.");
    }
  };

  const handleTeamChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlayer({ ...newPlayer, image: file });
    }
  };



  
  const addPlayer = async () => {
    // Validate required fields
    if (!newPlayer.player_name || !newPlayer.position || !newPlayer.club_id) {
      alert("Player name, position, and club ID are required.");
      return;
    }
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
  
    const formData = new FormData();
    formData.append("player_name", newPlayer.player_name);
    formData.append("height", newPlayer.height || "");
    formData.append("reference", newPlayer.reference || "");
    formData.append("image", newPlayer.image || "");
    formData.append("birthday", newPlayer.birthday || "");
    formData.append("place_of_birth", newPlayer.place_of_birth || "");
    formData.append("description", newPlayer.description || "");
    formData.append("position", newPlayer.position);
    formData.append("qualified", newPlayer.qualified ? 1 : 0);
    formData.append("club_id", newPlayer.club_id);
  
    try {
      const response = await axios.post(
        "http://localhost:8000/player",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        alert("Player added successfully!");
        setShowForm(false);
        fetchTeam(id); // Refresh the team data to show the new player
      }
    } catch (error) {
      console.error("Error adding player:", error);
      setError("Failed to add player. Please try again.");
    }
  };

  const cancelForm = () => {
    setNewPlayer({ name: "", role: "", imageSrc: "" });
    setShowForm(false);
  };

  const removePlayer = async (playerId) => {
    console.log("Attempting to remove player with ID:", playerId);
    console.log("Current players:", players);
  
    if (!playerId) {
      alert("Invalid player ID.");
      return;
    }
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8000/player/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        // Filter out the deleted player from the players state
        const updatedPlayers = players.filter((player) => player.id !== playerId);
        console.log("Updated players after removal:", updatedPlayers);
        setPlayers(updatedPlayers); // Update the players state
        alert("Player deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      setError("Failed to delete player. Please try again.");
    }
  };
  
  
  

  // Function to update club details
  const updateClubDetails = async () => {
    if (!team || !team.club_name) {
      setError("Club name is required.");
      return;
    }
  
    setIsUpdating(true); // Start loading
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }
  
      // Include club_name, club_details, and extra_details in the payload
      const payload = {
        club_name: team.club_name,
        club_details: team.club_details,
        extra_details: team.extra_details, // Add extra_details to the payload
      };
  
      const response = await axios.put(
        `http://localhost:8000/club/${team.club_id}`,
        payload, // Send the updated payload
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200) {
        alert("Club details updated successfully!");
        setEditMode(false); // Exit edit mode
      }
    } catch (error) {
      console.error("Error updating club details:", error);
      setError("Failed to update club details. Please try again.");
    } finally {
      setIsUpdating(false); // Stop loading
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return team ? (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/5 bg-white p-6 shadow-lg rounded-lg">
        <img
          src={team.club_picture  ? team.club_picture.startsWith("http") // Check if it's an external URL
            ? team.club_picture // Use the external URL as-is
            : `http://localhost:8000/uploads/${team.club_picture}` : defaultImage}
          alt={team.club_name}
          className="w-full h-60 rounded-lg object-cover"
        />
       {editMode ? (
  <>
    <input
      type="text"
      name="club_name"
      value={team.club_name}
      onChange={handleTeamChange}
      className="mt-2 p-2 border rounded-md w-full"
      placeholder="Club Name"
    />
    <textarea
      name="club_details"
      value={team.club_details}
      onChange={handleTeamChange}
      className="mt-2 p-2 border rounded-md w-full"
      placeholder="Club Details"
    />
    <textarea
      name="extra_details"
      value={team.extra_details}
      onChange={handleTeamChange}
      className="mt-2 p-2 border rounded-md w-full"
      placeholder="Extra Details"
    />
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={updateClubDetails}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Save Changes"}
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-md"
        onClick={() => setEditMode(false)}
      >
        Cancel
      </button>
    </div>
  </>
) : (
  <>
    <h1 className="text-3xl font-bold text-red-500 mt-4">{team.club_name}</h1>
    <p className="text-gray-700 mt-2">{team.club_details}</p>
    {team.extra_details && <p className="text-gray-700 mt-2">{team.extra_details}</p>}
    <div className="flex justify-between items-center mt-4">
      <Link to="/teams" className="text-red-500">← Back to Teams</Link>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={() => setEditMode(true)}
      >
        Edit Team
      </button>
    </div>
  </>
)}
      </div>
      <div className="w-full lg:w-3/5 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-900">Meet our Team</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {players.map((player) => (
            <li key={player.player_id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
               <Link to={`/player/${player.id}`}>
              <img
                src={player.image
                  ? player.image.startsWith("http") // Check if it's an external URL
                    ? player.image // Use the external URL as-is
                    : `http://localhost:8000/uploads/${player.image}` // Prepend base URL for local files
                  : defaultImage }
                alt={player.name}
                className="w-32 h-32 rounded-full object-cover"
              />
               </Link>
              <h3 className="text-lg font-semibold text-gray-900 mt-2">{player.name}</h3>
              <p className="text-sm text-indigo-600">{player.role}</p>
              {editMode && (
                <button
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => removePlayer(player.id)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center pt-16">
          <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-800" onClick={() => setShowForm(true)}>Add a Player</button>
        </div>
        {showForm && (
  <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Add a New Player</h3>
    <input
      type="text"
      name="player_name"
      placeholder="Player Name"
      value={newPlayer.player_name}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <input
      type="number"
      name="height"
      placeholder="Height (cm)"
      value={newPlayer.height}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <input
      type="text"
      name="reference"
      placeholder="Reference"
      value={newPlayer.reference}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <input
      type="date"
      name="birthday"
      placeholder="Birthday"
      value={newPlayer.birthday}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <input
      type="text"
      name="place_of_birth"
      placeholder="Place of Birth"
      value={newPlayer.place_of_birth}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <textarea
      name="description"
      placeholder="Description"
      value={newPlayer.description}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <input
      type="text"
      name="position"
      placeholder="Position"
      value={newPlayer.position}
      onChange={handleInputChange}
      className="p-2 border rounded-md w-full mb-2"
    />
    <label className="flex items-center mb-2">
      <input
        type="checkbox"
        name="qualified"
        checked={newPlayer.qualified}
        onChange={handleInputChange}
        className="mr-2"
      />
      Qualified
    </label>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleFileUpload}
      className="p-2 border rounded-md w-full mb-2"
    />
    <div className="flex gap-4 mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={addPlayer}
      >
        Save
      </button>
      <button
        className="px-4 py-2 bg-gray-400 text-white rounded-md"
        onClick={cancelForm}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default TeamPage;