import React, { useState } from "react";

// A modern search bar styled with Tailwind CSS
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchItems = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here

    setQuery("");
  } 

  return (
  <form onSubmit={searchItems}>
<div className="flex items-center  w-[35vw]  bg-gray-200 rounded-lg px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-gray-300">
  <input
    type="text"
    placeholder="Search for products..."
    onChange={handleInputChange}
    value={query}
    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
  />
  <button type="submit" className="text-gray-500 hover:text-gray-700" aria-label="Search" title="Search">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
      />
    </svg>
  </button>
</div>

  </form>
  );
};

export default SearchBar;