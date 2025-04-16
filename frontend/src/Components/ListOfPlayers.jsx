import React, { useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext"; 
import { useContext } from "react";
import axios from "axios";

const ListOfPlayers = ({club1_name, club2_name, club1_id, club2_id, match_id}) => {
  const { user } = useContext(UserContext);
  const [club1_players, setClub1players] = useState([]);
  const [club2_players, setClub2players] = useState([]);
  const [match_players, setMatchPlayers] = useState([]);
  const [club1_selected_player, setClub1SelectedPlayer] = useState();
  const [club2_selected_player, setClub2SelectedPlayer] = useState();

  const handlePlayerAdd = async (player_id) => {
    try {
      console.log(player_id)
      await axios.post(`http://localhost:8000/match/player-performance`, {
        match_id: match_id,
        player_id: player_id,
      })
      const result = await fetchMatchPlayers()
      setMatchPlayers(result.players)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPlayers = async (club_id) => {
    const response = await axios.get(`http://localhost:8000/club/players/${club_id}`);
    return response.data
  }
  const fetchMatchPlayers = async () => {
    const response = await axios.get(`http://localhost:8000/match/players/${match_id}`);
    return response.data
  }

  const getPlayer = (club_players, player_id) => {
    return club_players.find(player => player.player_id === player_id)
  }

  const onPlayerPerformanceChange = async (player_id, path, value) => {
    try {
      setMatchPlayers(match_players.map(player => {
        if(player.player_id === player_id) {
          return {
            ...player,
            [path]: value
          }
        }
        return player
      }
      ))
    }
    catch (error) {
      console.log(error)
    }
  }

  const handlePlayerPerformanceSave = async (player_id) => {
    try {
      const player = match_players.find(player => player.player_id === player_id)
      await axios.put(`http://localhost:8000/match/performance`, player)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleDeletePlayer = async (player_id) =>{
    try {
      await axios.delete(`http://localhost:8000/match/player-performance/${match_id}/${player_id}`)
      const result = await fetchMatchPlayers()
      setMatchPlayers(result.players)
    } catch (error) {
      console.log(error)
    }
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
                  colSpan="9"
                  className="bg-blue-600 text-white text-center py-2"
                >
                  {club1_name}
                </th>
              </tr>

              <tr className="bg-gray-200">
                <th className="border p-2">N° Lic</th>
                <th className="border p-2">N° </th>
                <th className="border p-2">Equipe A</th>
                <th className="border p-2">BUT</th>
                <th className="border p-2">A</th>
                <th className="border p-2">CR</th>
                <th className="border p-2">CB</th>
                <th className="border p-2">2'</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {match_players
                .filter((player) =>
                  club1_players.find((p) => p.player_id === player.player_id)
                )
                .map((player, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">
                      <input type="text" className="w-16 p-1 border rounded" />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="text"
                        disabled
                        value={
                          getPlayer(club1_players, player.player_id).player_name
                        }
                        className="w-44 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.goals_scored}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "goals_scored",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.assists}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "assists",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.yellow_cards}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "yellow_cards",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.red_cards}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "red_cards",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.two_minute_suspensions}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "two_minute_suspensions",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 flex flex-row justify-center gap-x-4 items-center">
                      <button
                        className="cursor-pointer"
                        title="save changes"
                        onClick={() => handlePlayerPerformanceSave(player.player_id)}
                      >
                        💾
                      </button>
                      <button className="cursor-pointer" title="delete" onClick={() => handleDeletePlayer(player.player_id)}>
                        ✘
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center">
            <select
              className="w-96 p-1 border rounded"
              onChange={(e) => setClub1SelectedPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              {club1_players.filter(player=>!match_players.find(p=>p.player_id===player.player_id)).map((player) => (
                <option value={player.player_id}>{player.player_name}</option>
              ))}
            </select>
            <button
              className="bg-blue-600 text-white p-2 rounded cursor-pointer"
              onClick={() => handlePlayerAdd(club1_selected_player)}
            >
              Add Player
            </button>
          </div>
        </div>

        {/* Sign Section between Teams */}
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="text-center font-bold text-xl p-4">
            <p>VS</p> {/* This is the sign between the teams */}
          </div>
        </div>
        {/* Team B Table */}
        <div className="flex flex-col justify-start items-start">
          <table className="w-1/2 border-collapse border">
            <thead>
              <tr>
                <th
                  colSpan="9"
                  className="bg-blue-600 text-white text-center py-2"
                >
                  {club2_name}
                </th>
              </tr>

              <tr className="bg-gray-200">
                <th className="border p-2">N° Lic</th>
                <th className="border p-2">N° </th>
                <th className="border p-2">Equipe B</th>
                <th className="border p-2">BUT</th>
                <th className="border p-2">A</th>
                <th className="border p-2">CR</th>
                <th className="border p-2">CB</th>
                <th className="border p-2">2'</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {match_players
                .filter((player) =>
                  club2_players.find((p) => p.player_id === player.player_id)
                )
                .map((player, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">
                      <input type="text" className="w-16 p-1 border rounded" />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="text"
                        disabled
                        value={
                          getPlayer(club2_players, player.player_id).player_name
                        }
                        className="w-44 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.goals_scored}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "goals_scored",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.assists}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "assists",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.yellow_cards}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "yellow_cards",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.red_cards}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "red_cards",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={player.two_minute_suspensions}
                        onChange={({ target: { value } }) =>
                          onPlayerPerformanceChange(
                            player.player_id,
                            "two_minute_suspensions",
                            parseInt(value)
                          )
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 flex flex-row justify-center gap-x-4 items-center">
                      <button
                        className="cursor-pointer"
                        title="save changes"
                        onClick={() => handlePlayerPerformanceSave(player.player_id)}
                      >
                        💾
                      </button>
                      <button className="cursor-pointer" title="delete" onClick={() => handleDeletePlayer(player.player_id)}>
                        ✘
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center">
            <select
              className="w-96 p-1 border rounded"
              onChange={(e) => setClub2SelectedPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              {club2_players.filter(player=>!match_players.find(p=>p.player_id===player.player_id)).map((player) => (
                <option value={player.player_id}>{player.player_name}</option>
              ))}
            </select>
            <button
              className="bg-blue-600 text-white p-2 rounded cursor-pointer"
              onClick={() => handlePlayerAdd(club2_selected_player)}
            >
              Add Player
            </button>
          </div>
        </div>

      
      </div>

      {/* Additional tables for other players or sections */}
      <div className="flex space-x-4">
        {/*<table className="w-1/2 border-collapse border">
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
            <th colSpan="8" className="bg-blue-600 text-white text-center py-2">
              singuature
            </th>
          </tr>
        </table> */}

        {/* Sign Section between Teams */}
        <div className="flex flex-col justify-center  w-1/2">
          <div className="text-center text-lg p-4"></div>
        </div>

        {/*<table className="w-1/2 border-collapse">
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
            <th colSpan="8" className="bg-blue-600 text-white text-center py-2">
              singuature
            </th>
          </tr>
        </table>*/}
      </div>
    </div>
  );
};

export default ListOfPlayers;
