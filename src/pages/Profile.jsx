import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async() => {
    await signOut(auth);
  };
  return (
    <div>
      {user && (
        <div className="profile">
          <p>{user?.displayName}</p>
          <img className="profile-picture" src={user?.photoURL || ""} />
          <button className="profile-button" onClick={signUserOut}>Log out</button>
        </div>
      )}
      {!user && (
        <div className="profile">
          <p>Please, Log in to continue</p>
          <button className="profile-button" onClick={() => navigate("/login")}>Log in</button>
        </div>
      )}
    </div>
  );
}
