import React, { useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext"; 
import { useContext } from "react";
import axios from "axios";

const ListOfPlayers = ({club1_name, club2_name, club1_id, club2_id, match_id}) => {
  const { user } = useContext(UserContext);
  const [club1_players, setClub1players] = useState([]);
  const [club2_players, setClub2players] = useState([]);
  const [match_players, setMatchPlayers] = useState([]);

  const fetchPlayers = async (club_id) => {
    const response = await axios.get(`http://localhost:8000/club/players/${club_id}`);
    return response.data
  }
  const fetchMatchPlayers = async () => {
    const response = await axios.get(`http://localhost:8000/match/players/${match_id}`);
    return response.data
  }


  useEffect(() => {
    if(!user) return;
    fetchPlayers(club1_id).then(data => setClub1players(data.players))
    fetchPlayers(club2_id).then(data => setClub2players(data.players))
    fetchMatchPlayers(match_id).then(data => setMatchPlayers(data.players))
  }
  ,[user])



  return (
    <div>
      <div className="flex space-x-4 mt-12">
        {/* Team A Table */}
        <div className="flex flex-col justify-start items-start">
        <table className="w-1/2 border-collapse border">
          <thead>
            <tr>
              <th
                colSpan="8"
                className="bg-blue-600 text-white text-center py-2"
              >
                {club1_name}
              </th>
            </tr>
            
            <tr className="bg-gray-200">
              <th className="border p-2">N lit</th>
              <th className="border p-2">N </th>
              <th className="border p-2">Equipe A</th>
              <th className="border p-2">BUT</th>
              <th className="border p-2">A</th>
              <th className="border p-2">2</th>
              <th className="border p-2">CH</th>
              <th className="border p-2">CH</th>
            </tr>
            
          </thead>
          <tbody>
              
              {/* <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-44 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
              </tr> */}
          </tbody> 

        </table>
        <div className="flex justify-center items-center">
          <select className="w-96 p-1 border rounded" name="cars" id="cars">
            {club1_players.map((player) => <option value={player.player_id}>{player.player_name}</option>)}
        </select>
        <button className="bg-blue-600 text-white p-2 rounded">Add Player</button>
        </div>

        </div>

        {/* Sign Section between Teams */}
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="text-center font-bold text-xl p-4">
            <p>VS</p> {/* This is the sign between the teams */}
          </div>
        </div>

        {/* Team B Table */}
        <table className="w-1/2 border-collapse border">
          <thead>
            <tr>
              <th
                colSpan="8"
                className="bg-blue-600 text-white text-center py-2"
              >
                {club2_name}
              </th>
            </tr>
            <tr className="bg-gray-200">
              <th className="border p-2">N lit</th>
              <th className="border p-2">N </th>
              <th className="border p-2">Equipe B</th>
              <th className="border p-2">BUT</th>
              <th className="border p-2">A</th>
              <th className="border p-2">2</th>
              <th className="border p-2">CH</th>
              <th className="border p-2">CH</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15)].map((_, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-44 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional tables for other players or sections */}
      <div className="flex space-x-4">
        <table className="w-1/2 border-collapse border">
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">
                  <input type="text" className="w-24.5 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-64 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
              </tr>
            ))}
          </tbody>
          <tr>
              <th
                colSpan="8"
                className="bg-blue-600 text-white text-center py-2"
              >
                singuature
              </th>
            </tr>
        </table>

         {/* Sign Section between Teams */}
         <div className="flex flex-col justify-center  w-1/2">
          <div className="text-center text-lg p-4">
          </div>
        </div>

        <table className="w-1/2 border-collapse">
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">
                  <input type="text" className="w-25 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="text" className="w-64 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
                <td className="border p-2 text-center">
                  <input type="number" className="w-16 p-1 border rounded" />
                </td>
              </tr>
              
            ))}
          </tbody>
          <tr>
              <th
                colSpan="8"
                className="bg-blue-600 text-white text-center py-2"
              >
                singuature
              </th>
            </tr>
        </table>
      </div>
    </div>
  );
};

export default ListOfPlayers;
