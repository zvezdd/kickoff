import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Sidebar() {



  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/login" >Login</Link></li>
        <li><Link to="/createpost">Create</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}
