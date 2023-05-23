import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //get user data from localStorage and parse it from JSON
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs);
    setCurrentUser(res.data); //send login fun to controller and update state
  };

  const logout = async (inputs) => {
    console.log('rfr');
    await axios.post('/auth/logout');
    setCurrentUser(null);
  };

  useEffect(() => {
    //update localstorage when we change user
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    //set data (currentUser, login, logout) to context
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};
