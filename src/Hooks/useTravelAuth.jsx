import React, { createContext, useState, useContext, useEffect } from "react";
import { logOut } from "../HelperFn/https";

const TravelAuthContext = createContext();

export const useTravelAuth = () => useContext(TravelAuthContext);

export const TravelAuthProvider = ({ children }) => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState === "true";
  });

  // Travel state
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
      setSelectedPlace(null);
      setSelectedFlight(null);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <TravelAuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        selectedPlace,
        setSelectedPlace,
        selectedFlight,
        setSelectedFlight,
      }}
    >
      {children}
    </TravelAuthContext.Provider>
  );
};
