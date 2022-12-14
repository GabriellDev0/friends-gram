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
  sendPasswordResetEmail,
} from 'firebase/auth';

// Add to FireStore
import {
  addDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  collection,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  deleteDoc,
  startAfter,
  getDocs,
  increment,
} from 'firebase/firestore';

// Add to Storage
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import UserContext from '../UserContext';

const useFirebase = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const createUser = async (username, email, password) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        }).then(()=>{
          sendEmailVerification(user);
          addDoc(collection(db, 'users'), {
            nameUser: username,
            emailUser: email,
            timeStamp: serverTimestamp(),
          });
        })
        // Add User to FireStore database 
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

  const lostPasswordFirebase = async (email) =>{
    setLoading(true)
    sendPasswordResetEmail(auth, email).then(()=>{
        setData('Email de redefinição de senha enviado com sucesso.')
        setLoading(false)
    })
    .catch((error) =>{
          setError('Ocorreu um erro ao enviar o e-mail de redefinição de senha.')
          setLoading(false)
    }) 
  }

  const addPostFirebase = async (
    title,
    description,
    file,
    nameUser = currentUser.displayName,
    emailUser = currentUser.email,
    views = 0,
    comments = [],
    imgURL = '',
    idUser = currentUser.uid,
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
      serverTimestamp: serverTimestamp(),
    });
    console.log('Novo documento adicionado with ID: ', docRef.id);

    const imageRef = ref(storage, `posts/${file.name}`);

    await uploadBytes(imageRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'posts', docRef.id), {
        imgURL: downloadURL,
      });
    });
    setLoading(false);
    console.log('Dados Enviados com Sucesso');
    navigate('/');
  };

  const getPostsFirebase = async (idUser = '', limite = 3) => {
    setLoading(true);
    const collectionRef = collection(db, 'posts');
    const queryAll = query(
      collectionRef,
      orderBy('serverTimestamp', 'desc'),
      limit(limite),
    );
    const queryByIdUser = query(
      collectionRef,
      where('idUser', '==', idUser),
      orderBy('serverTimestamp', 'desc'),
      limit(limite),
    );

    try {
      onSnapshot(idUser === '' ? queryAll : queryByIdUser, (querySnapShot) => {
        const data = [];
        setLastVisible(querySnapShot.docs[querySnapShot.docs.length - 1]);
        querySnapShot.forEach((doc) =>
          data.push({ ...doc.data(), id: doc.id }),
        );
        setData(data);
        setLoading(false);
      });
    } catch (error) {
      setError('Ocorreu algum erro ao carregar os posts desta página.');
      setLoading(false);
    }
  };

  async function infiniteScroll(idUser = '') {
    if (lastVisible !== undefined) {
      setLoading(true);
      const collectionRef = collection(db, 'posts');
      const next = query(
        collectionRef,
        orderBy('serverTimestamp', 'desc'),
        startAfter(lastVisible),
        limit(3),
        );
        const next2 = query(
          collectionRef,
          where('idUser', '==', idUser),
          orderBy('serverTimestamp', 'desc'),
          startAfter(lastVisible),
          limit(3),
        );

      const documentSnapshots = await getDocs(idUser === '' ? next : next2);

      documentSnapshots.forEach((doc) => {
        setData((data) => [...data, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    }
  }

  const getModalPost = async (idDoc) => {
    setLoading(true);
    const docRef = doc(db, 'posts', idDoc);
    try {
      const docSnap = await getDoc(docRef);
      const data = [];
      data.push({ ...docSnap.data(), id: idDoc });
      setData(data);
      setLoading(false);
    } catch (error) {
      setError('Ocorreu algum erro ao carregar este Post.');
      setLoading(false);
    }
  };

  const setViewPost = async (idDoc) =>{
    const docRef = doc(db, 'posts', idDoc)
    await updateDoc(docRef, {
        views: increment(1)
    });
  }

  const commentPostFirebase = async (id, comment) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'posts', id);
      await updateDoc(docRef, {
        comments: arrayUnion(comment),
      });
      setLoading(false);
    } catch (error) {
      setError('Ocorreu algum erro ao postar o comentário');
      setLoading(false);
    }
  };

  const postDeleteFirebase = async (id) => {
    setLoading(true);
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef)
      .then(() => {
        // Deletado com sucesso
        setLoading(false);
      })
      .catch((error) => {
        // Error
        setLoading(false);
      });
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
    lostPasswordFirebase,
    data,
    addPostFirebase,
    getPostsFirebase,
    infiniteScroll,
    lastVisible,
    getModalPost,
    setViewPost,
    commentPostFirebase,
    postDeleteFirebase,
    logOutFirebase,
    error,
    loading,
  };
};

export default useFirebase;
