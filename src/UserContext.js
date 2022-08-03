import React, { useEffect, useState } from 'react';

//Firebase Configs
import { auth } from './Firebase/Config';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true)
 

  // Session Persistence and Watch Auth Changed
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setEmailVerified(user.emailVerified);
        setLoading(false)
      } else {
        setCurrentUser(user);
        setEmailVerified(false)
        setLoading(false)
      }
    });
  }, []);

  if(loading){
    console.log('Pegando dados da sessão...')
    console.log('Email verificado: ',emailVerified)
    return console.log('Usuário: ',currentUser)
  }

  return (
    <UserContext.Provider value={{ currentUser, emailVerified }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
