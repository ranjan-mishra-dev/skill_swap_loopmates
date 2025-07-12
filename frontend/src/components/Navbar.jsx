import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#F9FAFB] px-2 py-4 shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
         <a href="/"> SkillsSwap</a>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-8 items-center">
          <button className="text-gray-800 font-medium hover:text-indigo-600 relative transition duration-200">
            Swap Request
            <span className="block w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
          </button>
          <button className="text-gray-800 font-medium hover:text-indigo-600 transition duration-200">
            My Skills
          </button>
          <button className="text-gray-800 font-medium hover:text-indigo-600 transition duration-200">
            Browse
          </button>
        </div>

        {/* User Avatar */}
        <Link to={`/user/profile`}>
        <img
          src={`https://i.pravatar.cc/150?img=38` || img} // Replace with real profile image
          alt="User"
          className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-200"
        />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
