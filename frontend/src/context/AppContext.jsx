// src/context/AppContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Make sure react-hot-toast is installed

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Fallback dev URL

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/getProfileData`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast.error(error?.response?.data?.msg || error.message || "Server error");
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
