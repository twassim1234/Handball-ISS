import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">FEUILLE DE MATCH</h2>
      <button
        onClick={handlePrint}
        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <FiDownload className="text-lg mr-2" />
        Export
      </button>
      <div className="mt-4">
        <table className="min-w-full border-collapse border border-black">
        <tbody>
          <tr>
              <td className="border p-2" colSpan={10}>
                <input type="text" name="equipeRecevante" value={matchDetails.equipeRecevante} onChange={handleChange} placeholder="Équipe Recevante" className="w-full p-1" />
              </td>
              <td className="border p-2" colSpan={10}>
                <input type="text" name="equipeVisiteuse" value={matchDetails.equipeVisiteuse} onChange={handleChange} placeholder="Équipe Visiteuse" className="w-full p-1" />
              </td>
              <td className="border p-2" colSpan={10}>
                <input type="text" name="spectateurs" value={matchDetails.spectateurs} onChange={handleChange} placeholder="Spectateurs" className="w-full p-1" />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="min-w-full border-collapse border border-black">
          <tbody>
          <tr>
              <td className="border p-2" colSpan={2}><input type="text" name="ville" value={matchDetails.ville} onChange={handleChange} placeholder="Ville" className="w-full p-1" /></td>
              <td className="border p-2" colSpan={2}><input type="text" name="salle" value={matchDetails.salle} onChange={handleChange} placeholder="Salle ou Terrain" className="w-full p-1" /></td>
              <td className="border p-2" colSpan={2}><input type="text" name="date" value={matchDetails.date} onChange={handleChange} placeholder="Date" className="w-full p-1" /></td>
              <td className="border p-2" colSpan={1}><input type="text" name="horaire" value={matchDetails.horaire} onChange={handleChange} placeholder="Horaire" className="w-full p-1" /></td>

            </tr>
          </tbody>
        </table>
        <table className="min-w-full border-collapse border border-black">
         <tbody>
            <tr className="bg-gray-200 font-bold">
              <td colSpan="2" className="border p-2 text-center">Mi-temps (30')</td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="A" className="w-5"/></td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="B" className="w-5"/></td>
              <td colSpan="2" className="border p-2 text-center">Fin du temps de jeu</td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="A" className="w-5"/></td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="B" className="w-5"/></td>
              <td colSpan="2" className="border p-2 text-center">1 ère plongation</td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="A" className="w-5"/></td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="B" className="w-5"/></td>
              <td colSpan="2" className="border p-2 text-center">2 ème plongation</td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="A" className="w-5"/></td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="B" className="w-5"/></td>
              <td colSpan="2" className="border p-2 text-center">Aprés jets de 7 m</td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="A" className="w-5"/></td>
              <td colSpan="3" className="border p-1 text-center"><input type="text"  placeholder="B" className="w-5"/></td>
              
            </tr>
            </tbody>
        </table>
        <table className="min-w-full border-collapse border border-black">
          <tbody>
          <tr>
              <td className="border p-2"><input type="text" name="nombre7m" value={matchDetails.nombre7m} onChange={handleChange} placeholder="Nombre de 7m" className="w-full p-1" /></td>
              <td colSpan="3" className="border p-2 text-center font-bold">A</td>
              <td className="border p-2"><input type="text" name="timeOut1" value={matchDetails.timeOut1} onChange={handleChange} placeholder="Team time-out 1" className="w-full p-1" /></td>
              <td className="border p-2"><input type="text" name="timeOut1" value={matchDetails.timeOut1} onChange={handleChange} placeholder="Team time-out 2" className="w-full p-1" /></td>
              <td colSpan="2" className="border p-2 text-center">Noms et Prénoms des joueurs et des Officiels</td>
              <td className="border p-2"><input type="text" name="timeOut1" value={matchDetails.timeOut1} onChange={handleChange} placeholder="Team time-out 1" className="w-full p-1" /></td>
              <td className="border p-2"><input type="text" name="timeOut1" value={matchDetails.timeOut1} onChange={handleChange} placeholder="Team time-out 2" className="w-full p-1" /></td>
              <td colSpan="3" className="border p-2 text-center font-bold">B</td>
              <td className="border p-2"><input type="text" name="nombre7m" value={matchDetails.nombre7m} onChange={handleChange} placeholder="Nombre de 7m" className="w-full p-1" /></td>
            </tr>
          </tbody>
        </table>
        

      </div>

    </div>
  );
};

export default MatchSheet;