import React from "react";

export default function RoundSearch({ onSearchChange }) {
  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search for a round..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
