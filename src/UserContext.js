import React, { useEffect, useState } from 'react';

//Firebase Configs
import { auth } from './Firebase/Config';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  // Session Persistence and Watch Auth Changed
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setEmailVerified(user.emailVerified);
      } else {
        setCurrentUser(user);
        setEmailVerified(null)
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, emailVerified }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
