////------------------ LoggedInUserContextProvider ------------------
// A custom context provider to make logged in user information and 
// token details (which are set on "LoginForm") available to other components, 
// even at different nesting levels.

import React, { createContext, useContext, useState } from 'react';

export const LoggedInUserContext = createContext({});

export const useLoggedInUserContext = () => useContext(LoggedInUserContext);

export default function LoggedInUserContextProvider({ children }) {
  const storedToken = localStorage.getItem('tictactoeToken');
  const [loggedInUser, setLoggedInUser] = useState(storedToken ? storedToken : {});
  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
}
