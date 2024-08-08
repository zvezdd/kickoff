// src/components/Login.js
import React from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1 className="h1-login">Sign in with Google to continue</h1>
      <button
        type="button"
        className="login-with-google-btn"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
