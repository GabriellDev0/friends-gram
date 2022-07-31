import React, { useEffect, useState } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

//Firebase Configs
import { auth } from './Firebase/Config';
import  { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  async function loginFirebase(email, password) {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email.value, password.value)
       .then((userCredential) => {
         const user = userCredential.user;
         console.log(user)
         setLoading(false)
         navigate('/conta')
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode);
         console.log(errorMessage);
         setError('Usuário ou senha não foram encontrados.')
         setLoading(false)
       });
   }

   function logOutFirebase() {
    signOut(auth)
      .then(() => {
        navigate('/login')
        console.log('deslogado com sucesso');
      })
      .catch((error) => {
        console.log(error);
        setError(error)
      });
  }
  // Session Persistence
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setCurrentUser(user)
      }else{
        setCurrentUser(user)
      }
})
  }, [])
  



  return (
    <UserContext.Provider value={{currentUser, loginFirebase, logOutFirebase, loading, error}}>{children}</UserContext.Provider>
  );
};

export default UserContext;
