import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/login" >Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/createpost">Create</Link></li>
      </ul>
    </div>
  );
}
