import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchSheet = () => {
  const [matchDetails, setMatchDetails] = useState({
    equipeRecevante: "",
    equipeVisiteuse: "",
    spectateurs: "",
    ville: "",
    salle: "",
    date: "",
    horaire: "",
    miTemps: "",
    finTemps: "",
    prolongations: "",
    deuxiemeProlongation: "",
    apresJets: "",
    nombre7m: "",
    timeOut1: "",
    timeOut2: "",
    joueurs: ""
  });

  const handleChange = (e) => {
    setMatchDetails({ ...matchDetails, [e.target.name]: e.target.value });
  };

  const MatchSheet = () => {
    const [matchDetails, setMatchDetails] = useState({
      equipeRecevante: "",
      equipeVisiteuse: "",
      spectateurs: "",
      ville: "",
      salle: "",
      date: "",
      horaire: "",
      miTemps: "",
      finTemps: "",
      prolongations: "",
      deuxiemeProlongation: "",
      apresJets: "",
      nombre7m: "",
      timeOut1: "",
      timeOut2: "",
      joueurs: ""
    });

    const [clubs, setClubs] = useState([]);

    useEffect(() => {
      // Fetch club names from the database
      axios.get("http://localhost:8000/club")
        .then(response => {
          setClubs(response.data);
        })
        .catch(error => {
          console.error("Error fetching clubs:", error);
        });
    }, []);

    const handleChange = (e) => {
      setMatchDetails({ ...matchDetails, [e.target.name]: e.target.value });
    };

    return (
      <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">FEUILLE DE MATCH</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-800">
        <thead>
          <tr className="bg-gray-200">
          <th colSpan="2" className="border p-2">
            <select
            name="equipeRecevante"
            value={matchDetails.equipeRecevante}
            onChange={handleChange}
            className="w-full p-1"
            >
            <option value="">Select Équipe Recevante</option>
            {clubs.map((club) => (
              <option key={club.club_id} value={club.club_name}>
              {club.club_name}
              </option>
            ))}
            </select>
          </th>
          <th colSpan="2" className="border p-2">
            <select
            name="equipeVisiteuse"
            value={matchDetails.equipeVisiteuse}
            onChange={handleChange}
            className="w-full p-1"
            >
            <option value="">Select Équipe Visiteuse</option>
            {clubs.map((club) => (
              <option key={club.club_id} value={club.club_name}>
              {club.club_name}
              </option>
            ))}
            </select>
          </th>
          <th colSpan="2" className="border p-2">
            <input
            type="text"
            name="spectateurs"
            value={matchDetails.spectateurs}
            onChange={handleChange}
            placeholder="Spectateurs"
            className="w-full p-1"
            />
          </th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className="border p-2">
            <input
            type="text"
            name="ville"
            value={matchDetails.ville}
            onChange={handleChange}
            placeholder="Ville"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="salle"
            value={matchDetails.salle}
            onChange={handleChange}
            placeholder="Salle ou Terrain"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="date"
            value={matchDetails.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="horaire"
            value={matchDetails.horaire}
            onChange={handleChange}
            placeholder="Horaire"
            className="w-full p-1"
            />
          </td>
          <td colSpan="2" className="border p-2">
            <input
            type="text"
            name="finTemps"
            value={matchDetails.finTemps}
            onChange={handleChange}
            placeholder="Fin du temps de jeu"
            className="w-full p-1"
            />
          </td>
          </tr>
          <tr className="bg-gray-200 font-bold">
          <td colSpan="3" className="border p-2">
            <input
            type="text"
            name="miTemps"
            value={matchDetails.miTemps}
            onChange={handleChange}
            placeholder="Mi-temps (34')"
            className="w-full p-1"
            />
          </td>
          </tr>
          <tr className="bg-gray-200 font-bold">
          <td colSpan="3" className="border p-2 text-center">Team A</td>
          <td colSpan="3" className="border p-2 text-center">Team B</td>
          </tr>
          <tr>
          <td className="border p-2">
            <input
            type="text"
            name="miTemps"
            value={matchDetails.miTemps}
            onChange={handleChange}
            placeholder="Mi-temps (34')"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="prolongations"
            value={matchDetails.prolongations}
            onChange={handleChange}
            placeholder="Les prolongations"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="deuxiemeProlongation"
            value={matchDetails.deuxiemeProlongation}
            onChange={handleChange}
            placeholder="2ème prolongation"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="apresJets"
            value={matchDetails.apresJets}
            onChange={handleChange}
            placeholder="Après jets de 7m"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="nombre7m"
            value={matchDetails.nombre7m}
            onChange={handleChange}
            placeholder="Nombre de 7m"
            className="w-full p-1"
            />
          </td>
          <td className="border p-2">
            <input
            type="text"
            name="timeOut1"
            value={matchDetails.timeOut1}
            onChange={handleChange}
            placeholder="Team time-out 1"
            className="w-full p-1"
            />
          </td>
          </tr>
        </tbody>
        </table>
      </div>
      </div>
    );
  };


};

export default MatchSheet;
