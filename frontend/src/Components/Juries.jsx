import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import pic1 from "../Assets/Teams/club.png";
import player from "../Assets/Players/player.jpg";
import player2 from "../Assets/Players/player2.jpg";

const initialPlayers = [
  { id: 1, name: "Wassim", role: "pro", imageSrc: player },
  { id: 2, name: "John Doe", role: "help", imageSrc: player2 },
  { id: 3, name: "Jane Smith", role: "unkown", imageSrc: pic1 },
  { id: 4, name: "Alex Brown", role: "unkown", imageSrc: pic1 },
];


const TeamPage = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState(initialPlayers);

  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: "", role: "", imageSrc: "" });

  // Handle input changes for team details
  const handleTeamChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  // Handle adding a new player
  const handleInputChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlayer({ ...newPlayer, imageSrc: URL.createObjectURL(file) });
    }
  };

  const addPlayer = () => {
    if (!newPlayer.name || !newPlayer.role || !newPlayer.imageSrc) {
      alert("Please fill in all fields");
      return;
    }

    setPlayers([...players, { id: players.length + 1, ...newPlayer }]);
    setNewPlayer({ name: "", role: "", imageSrc: "" });
    setShowForm(false);
  };

  const cancelForm = () => {
    setNewPlayer({ name: "", role: "", imageSrc: "" });
    setShowForm(false);
  };

  // Remove a player
  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
     
      {/* Right Section (Players List) */}
      <div className="w-full bg-white p-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Meet our juries
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We’re a dynamic group of individuals passionate about what we do and
            dedicated to delivering the best results.
          </p>
        </div>

        {/* Players Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {players.map((person) => (
            <li
              key={person.id}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md relative"
            >
              <Link to={`/player/${person.id}`}>
                <img
                  src={person.imageSrc}
                  alt={person.name}
                  className="w-fit h-60 size-96 rounded object-cover"
                />
              </Link>
              <h3 className="text-lg font-semibold text-gray-900 mt-2">
                {person.name}
              </h3>
              <p className="text-sm text-indigo-600">{person.role}</p>
              
              {/* Show Remove Button Only in Edit Mode */}
              {editMode && (
                <button
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => removePlayer(person.id)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Add Player Button */}
        <div className="flex justify-center items-center pt-16">
          <button
            type="button"
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-800"
            onClick={() => setShowForm(true)}
          >
            Add 
          </button>
        </div>

        {/* Add Player Form */}
        {showForm && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Add a New Player
            </h3>
            <div className="flex flex-col gap-3">
              <input type="text" name="name" placeholder="Player Name" value={newPlayer.name} onChange={handleInputChange} className="p-2 border rounded-md" />
              <input type="text" name="role" placeholder="Player Role" value={newPlayer.role} onChange={handleInputChange} className="p-2 border rounded-md" />
              <input type="text" name="imageSrc" placeholder="Image URL" value={newPlayer.imageSrc} onChange={handleInputChange} className="p-2 border rounded-md" />
              <input type="file" accept="image/*" onChange={handleFileUpload} className="p-2 border rounded-md" />
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={addPlayer}>Save</button>
                <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={cancelForm}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
