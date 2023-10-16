import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar}>Close</button>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/about">About</Link>
      <Link to="/logout">Log Out</Link>
    </div>
  );
};

export default Sidebar;
