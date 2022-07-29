//Firebase
import { auth } from './Config'
import { signInWithEmailAndPassword } from 'firebase/auth';

function loginFirebase(email, password){
  signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
}

export { loginFirebase }