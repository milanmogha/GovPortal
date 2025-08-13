import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not logged in, redirect to login, saving the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.user.role;

    if (userRole !== 'admin') {
      // User is logged in but is not an admin, redirect them to their dashboard
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    // Token is invalid or expired, clear it and redirect to login
    console.error("Invalid token:", error);
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // User is authenticated and is an admin, render the requested component
  return children;
};

export default AdminRoute;