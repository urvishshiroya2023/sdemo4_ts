import React from 'react';
import { Navigate } from 'react-router-dom';
import Body from './Body';

const ProtectedRoutes = () => {
    const auth = localStorage.getItem("authToken");
    return (
        auth ? <Body /> : <Navigate to={"/signin"} />
    )
}

export default ProtectedRoutes