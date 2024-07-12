import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import SignUp from "./pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import CreatePost from "./pages/CreatePost";

function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/createpost" element={<CreatePost/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
