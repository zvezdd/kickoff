import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import {  useSelector, useDispatch} from "react-redux";
import { increment, decrement, incrementByAmount } from "./redux/slices/userSlice";


import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import CreatePost from "./pages/create-post/CreatePost";
import Profile from "./pages/Profile";

const App = () => {


  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <>
    <button onClick={dispatch(increment())}>inc</button>
    <span>{count}</span>
    <button onClick={dispatch(decrement())}>dec</button>
    </>
    // <Router>
    //   <div className="App">
    //     <Sidebar />
    //     <div className="main-content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/createpost" element={<CreatePost />} />
    //         <Route path="/profile" element={<Profile />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
