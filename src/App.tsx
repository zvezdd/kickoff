import React from "react";
import "./App.css";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import CreatePost from "./pages/create-post/CreatePost";
import Profile from "./pages/Profile";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            { !user ? (
            <Route path="/login" element={<Login />} /> ) :
           ( <> <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} /> </> )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
