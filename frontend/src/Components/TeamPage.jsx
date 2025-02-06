import React from "react";
import { Link, useParams } from "react-router-dom";
import pic1 from "../Assets/Teams/club.png";

const people = [
  { name: "Wassim", role: "Captain", imageSrc: pic1 },
  { name: "John Doe", role: "Striker", imageSrc: pic1 },
  { name: "Jane Smith", role: "Midfielder", imageSrc: pic1 },
  { name: "Alex Brown", role: "Defender", imageSrc: pic1 },
];

const teamData = {
  1: {
    name: "Team 1",
    description: "Team 1 is one of the best teams in the league. They have won multiple championships and are known for their strong defense.",
    additionalInfo: "Additional info about the club goes here.",
  },
  2: {
    name: "Team 2",
    description: "Team 2 has a legendary attack and is well known for its aggressive playing style.",
    additionalInfo: "More details about Team 2.",
  },
};

const TeamPage = () => {
  const { id } = useParams();
  const team = teamData[id] || teamData[1]; // Default to Team 1 if id is invalid

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section (Team Details) */}
      <div className="w-full lg:w-2/5 bg-white p-6 shadow-lg rounded-lg">
        <img src={pic1} alt={team.name} className="w-full h-fit   object-cover rounded-lg" />
        <h1 className="text-3xl font-bold text-red-500 mt-4">{team.name}</h1>
        <p className="text-gray-700 mt-2">{team.description}</p>
        <p className="text-gray-700 mt-2">{team.additionalInfo}</p>
        <Link to="/teams" className="text-red-500 mt-4 inline-block">← Back to Teams</Link>
      </div>

      {/* Right Section (Players List) */}
      <div className="w-full lg:w-3/5 bg-white p-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">Meet our Team</h2>
          <p className="mt-2 text-lg text-gray-600">
            We’re a dynamic group of individuals passionate about what we do and dedicated to delivering the best results.
          </p>
        </div>

        {/* Players Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <li key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <img src={person.imageSrc} alt={person.name} className="w-fit h-fit size-fit rounded-full object-cover" />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">{person.name}</h3>
              <p className="text-sm text-indigo-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamPage;
