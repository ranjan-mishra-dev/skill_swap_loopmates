// src/context/AppContext.js
import React, { createContext, useContext, useState } from 'react';
export const AppContext = createContext();

const AppProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null);
      const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
      const backendUrl = import.meta.env.VITE_BACKEND_URL



    const value = {
        userProfile, token, setToken, backendUrl
    }

  return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
  );
};

export default AppProvider