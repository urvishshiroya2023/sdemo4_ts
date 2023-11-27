// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("authToken") || null);

//   const login = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("authToken", newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("authToken");
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// NewAuthContext.js
import React, { createContext, useContext, useState } from "react";

const NewAuthContext = createContext();

export const NewAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <NewAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </NewAuthContext.Provider>
  );
};

export const useNewAuth = () => {
  const context = useContext(NewAuthContext);
  if (!context) {
    throw new Error("useNewAuth must be used within a NewAuthProvider");
  }
  return context;
};

