import React from "react";

const ListOfPlayers = ({club1_name, club2_name}) => {
  return (
    <div>
      <div className="flex space-x-4 mt-12">
        {/* Team A Table */}
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
