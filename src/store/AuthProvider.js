import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function calcRemainingTime(expirationTime) {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
}

function retrieveStoredToken() {
  const initialToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calcRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    initialToken,
    remainingTime,
  };
}

const AuthProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  const initToken = (tokenData)? tokenData.initialToken : '';
  const [token, setToken] = useState(initToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  function loginHandler(token, expirationTime) {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calcRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  const context = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
