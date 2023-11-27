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
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // const { token } = useNewAuth();
  const token = localStorage.getItem("authToken")
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/signin" />;
  // return token ? <Body /> : <Navigate to="/signin" />;
  // return token ? <HomePage /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
