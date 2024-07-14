import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import CreatePost from "./pages/create-post/CreatePost";
import Profile from "./pages/Profile";

function App() {

  
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
