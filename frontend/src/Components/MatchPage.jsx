import { useParams } from "react-router-dom";
import pic1 from "../Assets/Matche/match.jpg";
import ListOfPlayers from "./ListOfPlayers";
import ReclamationSection from "./ReclamationSection";
import MatchDetails from "./MatchDetails";
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
  const match = matches.find((m) => m.id === parseInt(id));
  const fetchMatch = async () => {
    const response = await fetch(`http://localhost:8000/matches/${id}`);
    const data = await response.json();
    console.log(data);
  }
  if (!match) {
    return <div className="p-6">Match not found.</div>;
  }

  return (
    <div className="p-4 lg:p-22">
      <h1 className=" flex justify-center text-4xl font-bold mb-4">Match Details</h1>
      <img src={match.image} alt={`${match.teams[0]} vs ${match.teams[1]}`} className=" w-full h-full flex items-center  object-cover rounded-b-4xl" />

      <MatchDetails/>
      <ListOfPlayers/>
      <ReclamationSection/>



    </div>
  );
}