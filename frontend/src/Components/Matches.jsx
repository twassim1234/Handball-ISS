import { useState } from "react";
import pic1 from "../Assets/Matche/match.jpg";
import { Link } from "react-router-dom";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const initialMatches = [
  {
    id: 1,
    teams: ["Team A", "Team B"],
    address: "rades",
    image: pic1,
    status: "new",
    date: "2025-02-12",
  },
  {
    id: 2,
    teams: ["Team C", "Team D"],
    address: "rades",
    image: pic1,
    status: "old",
    date: "2025-02-10",
  },
  {
    id: 3,
    teams: ["Team E", "Team F"],
    address: "rades",
    image: pic1,
    status: "new",
    date: "2025-02-11",
  },
];

export default function MatchList() {
  const [matches, setMatches] = useState(initialMatches);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { user } = useContext(UserContext);

  const [newMatch, setNewMatch] = useState({
    team1: "",
    team2: "",
    address: "",
    date: "",
    image: "",
    status: "new",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMatch.team1 && newMatch.team2 && newMatch.address && newMatch.date) {
      const newMatchObj = {
        ...newMatch,
        teams: [newMatch.team1, newMatch.team2],
        id: matches.length + 1,
      };
      setMatches([...matches, newMatchObj]);
      setNewMatch({
        team1: "",
        team2: "",
        address: "",
        date: "",
        status: "new",
        image: "",
      });
      setImagePreview(""); 
      setShowForm(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleAddGame = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewMatch({
      team1: "",
      team2: "",
      address: "",
      date: "",
      status: "new",
      image: "",
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
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter("all")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition">
          All Matches
        </button>
        <button onClick={() => setFilter("new")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition">
          New Matches
        </button>
        <button onClick={() => setFilter("old")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition">
          Old Matches
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
  {filteredMatches.map((match) => (
    <Link to={`/match/${match.id}`} key={match.id} onClick={handleMatchClick} className="p-4 border rounded-lg shadow-md bg-white cursor-pointer">
      <div className="flex justify-center items-center">
        <img
          src={match.image}
          alt={`${match.teams[0]} vs ${match.teams[1]}`}
          className=" lg:w-fit lg:h-60 w-80 h-40 object-cover rounded-lg"
        />
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-center">{match.teams[0]} vs {match.teams[1]}</h2>
        <p className="text-gray-500 text-center">{match.address}</p>
        <p className="text-sm mt-1 text-gray-400 text-center">Date: {match.date}</p>
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
              <label className="block mb-2">Team 1 Name</label>
              <input type="text" name="team1" value={newMatch.team1} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Team 2 Name</label>
              <input type="text" name="team2" value={newMatch.team2} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input type="text" name="address" value={newMatch.address} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Date</label>
              <input type="date" name="date" value={newMatch.date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image</label>
              <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-40 object-cover rounded-lg" />}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select name="status" value={newMatch.status} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="new">New</option>
                <option value="old">Old</option>
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
