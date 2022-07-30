import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const userIsLoggedIn = !!token;

  function loginHandler(token) {
    setToken(token);
  }

  function logoutHandler() {
    setToken("");
  }

  const context = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
