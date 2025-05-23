import React, { useState } from "react";

const Search = ({ onSearch, placeholder = "Search ..." }) => {  // Added placeholder prop
  const [search, setSearch] = useState("");

  return (
    <div className="text-center py-4 bg-gray-50">
      <input
        type="text"
        placeholder={placeholder}  // Use the prop
        className="px-4 py-2 border rounded-md w-1/2"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;