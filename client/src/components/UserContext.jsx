import React, { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie';

const UserContext = createContext(); //this is what youll import

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {//logs u in
    console.log(userData);
    setUser(userData);//all of your data
  };

  const logout = () => {//logs u out
    Cookies.remove(user._id);
    setUser(null);
  };

  return ( //so u can check out the user info, or import the login/logout functionality
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
