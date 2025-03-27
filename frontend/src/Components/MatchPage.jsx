import { useParams } from "react-router-dom";
import pic1 from "../Assets/Matche/match.jpg";
import ListOfPlayers from "./ListOfPlayers";
import ReclamationSection from "./ReclamationSection";
import MatchDetails from "./MatchDetails";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";

const matches = [
  {
    id: 1,
    teams: ["Team A", "Team B"],
    address: "Rades",
    players: ["Wassim", "Wassim"],
    image: pic1,
    status: "new",
    date: "2025-02-12",
    score: "2-1",
    feedback: "Great game!",
  },
];

export default function MatchPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [match, setMatch] = useState();
  const fetchMatch = async () => {
    const response = await axios.get(`http://localhost:8000/matches/${id}`);
    console.log(response.data);
    setMatch(response.data.match);
  }
  useEffect(() => {
      if(!user) return;
      fetchMatch();
    },[user]);

    // Construct the image URL
  const getImageUrl = () => {
    if (!match?.image_url) return pic1;
    return `http://localhost:8000/uploads/${match.image_url}`;
  };

  

  return (
    <AuthenticationLayout requiresAuth allowedRoles={[1,2,3]}>
    {match?<div className="p-4 lg:p-22">
      <h1 className=" flex justify-center text-4xl font-bold mb-4">Match Details</h1>
      <img src={getImageUrl()} alt={`${match.club1_name} vs ${match.club2_name}`} className=" w-full h-full flex items-center  object-cover rounded-b-4xl"  onError={(e) => {
              e.target.src = pic1; // Fallback to default image if error
            }}/>

      <MatchDetails/>
      <ListOfPlayers match_id={match.match_id} club1_id={match.club1} club2_id={match.club2} club1_name={match.club1_name} club2_name={match.club2_name}/>
      <ReclamationSection/>

    </div>:
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    } 
    </AuthenticationLayout>
  );
}