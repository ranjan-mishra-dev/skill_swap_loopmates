import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, userData, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const profileImage = userData?.profilePhoto || "/default-avatar.png";

  const handleLogout = () => {
    setToken(null); // remove token from context
    localStorage.removeItem("token"); // also from localStorage if stored
    navigate("/login");
  };

  return (
    <nav className="bg-[#F9FAFB] px-2 py-2 shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
          <Link to="/">SkillsSwap</Link>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-8 items-center">
          {token ? (
            <>
              <Link
                to="/requests"
                className="group text-gray-800 font-medium hover:text-indigo-600 relative transition duration-200"
              >
                Swap Requests
                <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
              </Link>

              <Link
                to="/my-skills"
                className="group text-gray-800 font-medium hover:text-indigo-600 transition duration-200"
              >
                My Skills
                <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
              </Link>

              <Link
                to="/browse"
                className="group text-gray-800 font-medium hover:text-indigo-600 transition duration-200"
              >
                Browse
                <span className="group-hover:block hidden w-5 h-0.5 bg-indigo-600 mx-auto mt-1 rounded-full"></span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 font-medium ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 hover:text-indigo-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-800 hover:text-indigo-600 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* User Avatar or Login/Register */}
        {token ? (
          <Link to="/profile">
            <img
              src={profileImage}
              alt="User"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-amber-500"
            />
          </Link>
        ) : (
          <div className="flex gap-4 md:hidden">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-indigo-600 hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm text-indigo-600 hover:underline"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
