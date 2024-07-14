import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Sidebar() {
  const [user] = useAuthState(auth);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/createpost">Create Post</Link>
          </li>
        )}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
