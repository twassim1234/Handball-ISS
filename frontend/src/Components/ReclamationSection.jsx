import React from 'react'

const ReclamationSection = () => {
  return (
    <div>
        {/* Reserve & Reclamations */}
<div className="border border-gray-300 p-3 mb-4">
  <h2 className="font-bold">Réserves et Réclamations</h2>
  <textarea className="w-full h-16 border border-gray-200 mt-2" placeholder="Enter your reservations or claims here..."></textarea>
</div>

      {/* Signature Section */}
<div className="grid grid-cols-3 gap-4">
  <div>
    <h3 className="font-semibold">Arbitres</h3>
    <p>Nom: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter name" /></p>
    <p>Signature: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter signature" /></p>
  </div>
  <div>
    <h3 className="font-semibold">Officiels de Table</h3>
    <p>Nom: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter name" /></p>
    <p>Signature: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter signature" /></p>
  </div>
  <div>
    <h3 className="font-semibold">Délégués FTHB</h3>
    <p>Nom: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter name" /></p>
    <p>Signature: <input type="text" className="border border-gray-200 p-1 mt-1 w-full" placeholder="Enter signature" /></p>
  </div>
</div>

    </div>
  )
}

export default ReclamationSection
