import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import pic1 from "../Assets/Teams/club.png";
import player from "../Assets/Players/player.jpg";
import player2 from "../Assets/Players/player2.jpg";

const initialPlayers = [
  { id: 1, name: "Wassim", role: "Captain", imageSrc: player },
  { id: 2, name: "John Doe", role: "Striker", imageSrc: player2 },
  { id: 3, name: "Jane Smith", role: "Midfielder", imageSrc: pic1 },
  { id: 4, name: "Alex Brown", role: "Defender", imageSrc: pic1 },
];

const initialTeamData = {
  1: {
    name: "Team 1",
    description:
      "Team 1 is one of the best teams in the league. They have won multiple championships and are known for their strong defense.",
    additionalInfo: "Additional info about the club goes here.",
  },
  2: {
    name: "Team 2",
    description:
      "Team 2 has a legendary attack and is well known for its aggressive playing style.",
    additionalInfo: "More details about Team 2.",
  },
};

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(initialTeamData[id] || initialTeamData[1]);
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
      {/* Left Section (Team Details) */}
      <div className="w-full lg:w-2/5 bg-white p-6 shadow-lg rounded-lg">
        <img
          src={pic1}
          alt={team.name}
          className="lg:w-full lg:px-12 md:px-60 h-fit px-28 object-cover rounded-lg"
        />
        
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={team.name}
              onChange={handleTeamChange}
              className="mt-2 p-2 border rounded-md w-full"
            />
            <textarea
              name="description"
              value={team.description}
              onChange={handleTeamChange}
              className="mt-2 p-2 border rounded-md w-full"
            />
            <textarea
              name="additionalInfo"
              value={team.additionalInfo}
              onChange={handleTeamChange}
              className="mt-2 p-2 border rounded-md w-full"
            />
            
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-500 mt-4">{team.name}</h1>
            <p className="text-gray-700 mt-2">{team.description}</p>
            <p className="text-gray-700 mt-2">{team.additionalInfo}</p>
          </>
        )}

        {/* Back & Edit Buttons */}
        <div className="flex justify-between items-center mt-4">
          <Link to="/teams" className="text-red-500">
            ← Back to Teams
          </Link>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel Edit" : "Edit Team"}
          </button>
        </div>
      </div>

      {/* Right Section (Players List) */}
      <div className="w-full lg:w-3/5 bg-white p-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Meet our Team
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
            Add a Player
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
