import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../../Firebase/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Entrar</button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
