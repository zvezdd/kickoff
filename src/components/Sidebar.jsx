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
          <div className="icon-text">
            <i className="gg-home"></i>
            <Link to="/">Home</Link>{" "}
          </div>
        </li>
        {!user ? (
          <li>
            <div className="icon-text">
              <i className="gg-log-in"></i>
              <Link to="/login">Login</Link>
            </div>
          </li>
        ) : (
          <li>
            <div className="icon-text">
              <i className="gg-add-r"></i>
              <Link to="/createpost">Create Post</Link>
            </div>
          </li>
        )}
        <li>
          <div className="icon-text">
            <i className="gg-profile"></i>
            <Link to="/profile">Profile</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
