import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../UserContext';

const ProtecedRoute = ({ children }) => {
  const { currentUser, emailVerified } = useContext(UserContext);

  
  if (currentUser === null || emailVerified === false) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtecedRoute;
