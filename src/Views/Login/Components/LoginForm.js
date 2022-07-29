import React from 'react';
import { Link } from 'react-router-dom';

//Form Components
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import useForm from '../../../Hooks/useForm';

//Firebase endPoints
import { loginFirebase } from '../../../Firebase/firebaseEndPoints';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  function handleLogin(event) {
    event.preventDefault();

    if (email.validade() && password.validade()) {
        loginFirebase(email, password)
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
