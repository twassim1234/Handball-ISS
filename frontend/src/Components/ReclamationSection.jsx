import React from 'react'

const ReclamationSection = () => {
  return (
    <div className='p-4'>
      {/* Reserve & Reclamations */}
      <div className="border border-black p-3 mb-4">
        <h2 className="font-bold">RESERVES ET RECLAMATIONS</h2>
        <textarea className="w-full h-40 border border-gray-400 mt-2" ></textarea>
      </div>

      {/* Signature Section */}
      <div className="grid grid-cols-3 gap-4 border border-bla p-3 mb-4">
        <div>
          <h3 className="font-semibold">ARBITRES</h3>
          <p>Nom: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
          <p>Signature: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
        </div>
        <div>
          <h3 className="font-semibold">OFFICIELS DE TABLE</h3>
          <p>Nom: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
          <p>Signature: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
        </div>
        <div>
          <h3 className="font-semibold">DELEGUES FTHB</h3>
          <p>Nom: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
          <p>Signature: <input type="text" className="border border-gray-400 p-1 mt-1 w-full" /></p>
        </div>
      </div>

    </div>
  )
}

export default ReclamationSection
