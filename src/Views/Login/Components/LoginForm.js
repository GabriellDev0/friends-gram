import React from 'react';
import { Link } from 'react-router-dom';

//Firebase
import { auth } from '../../../Firebase/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';

//Form Components
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import useForm from '../../../Hooks/useForm';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  function handleLogin(event) {
    event.preventDefault();

    if (email.validade() && password.validade()) {
      signInWithEmailAndPassword(auth, email.value, password.value)
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
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
