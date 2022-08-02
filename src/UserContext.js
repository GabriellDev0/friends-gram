import React, { useEffect, useState } from 'react';

//Firebase Configs
import { auth } from './Firebase/Config';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  console.log(currentUser)
  console.log(emailVerified)
  // Session Persistence and Watch Auth Changed
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setEmailVerified(user.emailVerified);
      } else {
        setCurrentUser(user);
        setEmailVerified(false)
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
