// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Body from './Body';

// const ProtectedRoutes = () => {
//     const auth = localStorage.getItem("authToken");
//     return (
//         auth ? <Body /> : <Navigate to={"/signin"} />
//     )
// }

// export default ProtectedRoutes

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Body from "./Body";
import HomePage from "./HomePage";

const ProtectedRoutes = () => {
  const { token } = useAuth();
  //   return token ? <Body /> : <Navigate to="/signin" />;
  return token ? <HomePage /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
