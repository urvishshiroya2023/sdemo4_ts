// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoutes = () => {
//   // const { token } = useNewAuth();
//   const token = localStorage.getItem("authToken")
//   return token ? <Outlet /> : <Navigate to="/signin" />;
//   // return token ? <Body /> : <Navigate to="/signin" />;
//   // return token ? <HomePage /> : <Navigate to="/signin" />;
// };

// export default ProtectedRoutes;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
  // const { token } = useNewAuth();
  const token = localStorage.getItem('authToken');

  return token ? <Outlet /> : <Navigate to="/signin" />;
  // Alternatively, you can replace `<Navigate to="/signin" />` with your desired fallback component.
};

export default ProtectedRoutes;
