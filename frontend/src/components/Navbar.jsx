import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { backendUrl, token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(userData)

const profileImage = userData?.profilePhoto || "/default-avatar.png";

  return (
    <nav className="bg-[#F9FAFB] px-2 py-2 shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
          <Link to="/">SkillsSwap</Link>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-8 items-center">
          <button className="group text-gray-800 font-medium hover:text-indigo-600 relative transition duration-200">
            Swap Request
            <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
          </button>

          <button className="group text-gray-800 font-medium hover:text-indigo-600 transition duration-200">
            My Skills
            <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
          </button>

          <button className="group text-gray-800 font-medium hover:text-indigo-600 transition duration-200">
            Browse
            <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
          </button>
        </div>

        {/* User Avatar */}
        <Link to="/profile">
          <img
            src={profileImage}
            alt="User"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-amber-500"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
