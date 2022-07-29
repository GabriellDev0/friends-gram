//Firebase
import { auth } from './Config';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

async function loginFirebase(email, password) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  function logOutFirebase() {
    signOut(auth)
      .then(() => {
        console.log('deslogado com sucesso');
      })
      .catch((error) => {
        console.log(error);
      });
  }


export {loginFirebase, logOutFirebase }

