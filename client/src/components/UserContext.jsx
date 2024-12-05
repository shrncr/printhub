import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

// Create the context
const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On component mount, retrieve user data from cookies
  useEffect(() => {
    const userData = Cookies.get('user'); // Retrieve the user data from the cookie
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user data if cookie exists
    }
  }, []);

  const login = (userData) => {
    // Log in the user and store their data in a cookie
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Cookie expires in 7 days
  };

  const logout = () => {
    // Log out the user and remove the cookie
    Cookies.remove('user'); // Clear the user cookie
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
