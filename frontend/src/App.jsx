import React from "react";
import UserForm from "./pages/UserForm";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./Home";
import SwapRequests from "./pages/SwapRequests";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="text-red-500">
      <ToastContainer />
      <Navbar />
      
      <Routes>
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/requests" element={<SwapRequests />} />
      </Routes>
    </div>
  );
};

export default App;
