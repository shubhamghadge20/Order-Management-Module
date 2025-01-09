import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState(localStorage.getItem('token'));

  const login = (token) => {
    setAuthData(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
