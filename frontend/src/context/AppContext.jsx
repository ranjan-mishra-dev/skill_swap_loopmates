// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";
export const AppContext = createContext();

const AppProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(false);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/users/update-profile",
        { headers: { token } }
      );
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    userProfile,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
