import React from "react";

export default function CourseSearch({ onSearchChange }) {
  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search for a course..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
