import React, { useState } from 'react';
import { auth } from './Firebase/Config';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
      setLoading(false)
    } else {
      setCurrentUser(user);
      setLoading(false)
    }
  });

  
  return (
    <UserContext.Provider value={{currentUser, loading}}>{children}</UserContext.Provider>
  );
};

export default UserContext;
