import React from "react";
import UserForm from "./pages/UserForm";

// import React from 'react'
// import Home from './pages/Home'
import { Route, Routes } from "react-router-dom";
// import Doctors from './pages/Doctors'
// import Login from './pages/Login'
// import MyProfile from './pages/MyProfile'
// import MyAppoinments from './pages/MyAppoinments'
// import Contact from './pages/Contact'
// import Appoinment from './pages/Appoinment'
// import Navbar from './components/Navbar'
// import About from './pages/About'
// import Footer from './components/Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="text-red-500">
      <ToastContainer />

      <Routes>
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
