import { useState, useContext } from 'react';
import { auth, db, storage } from '../Firebase/Config';
import { useNavigate } from 'react-router-dom';
// Create Account Auth Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';

// Add to FireStore
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

// Add to Storage
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import UserContext from '../UserContext';

const useFirebase = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const createUser = async (username, email, password) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        });
        sendEmailVerification(user);
        // Add User to FireStore database
        addDoc(collection(db, 'users'), {
          nameUser: username,
          emailUser: email,
          timeStamp: serverTimestamp(),
        });
        setTimeout(() => {
          logOutFirebase();
        }, 400);
      })
      .catch((error) => {
        setError('Email já cadastrado.');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    setLoading(false);
  };

  const loginFirebase = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        if (user.emailVerified === true) {
          navigate('/conta');
        } else {
          logOutFirebase();
          setError(
            'Confirme seu endereço de e-mail na sua caixa de entrada, olhe no Spam.',
          );
        }
        setTimeout(() => {
          setError(null);
        }, 5000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setError('Usuário ou senha não foram encontrados.');
        setLoading(false);
      });
  };

  const addPostFirebase = async (
    title,
    description,
    file,
    nameUser = currentUser.displayName,
    emailUser = currentUser.email,
    views = 0,
    comments = [],
    imgURL = '',
    idUser = currentUser.uid
  ) => {
    setLoading(true);
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      description,
      imgURL,
      nameUser,
      emailUser,
      views,
      comments,
      idUser,
      serverTimestamp: serverTimestamp()
    });
    console.log('Novo documento adicionado with ID: ', docRef.id)

    const imageRef = ref(storage, `posts/${file.name}`);

    await uploadBytes(imageRef, file).then(async (snapshot)=>{
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db,'posts', docRef.id),{
          imgURL: downloadURL
        })
    })
    setLoading(false);
    console.log('Dados Enviados com Sucesso')
    navigate('/')
  };

  const logOutFirebase = async () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
        console.log('deslogado com sucesso');
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return {
    createUser,
    loginFirebase,
    addPostFirebase,
    logOutFirebase,
    error,
    loading,
  };
};

export default useFirebase;
