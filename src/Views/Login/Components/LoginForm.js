import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

//Form Components
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import useForm from '../../../Hooks/useForm';

//Firebase endPoints
// import {loginFirebase} from '../../../Firebase/firebaseEndPoints'

import UserContext from '../../../UserContext';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();
  // const [loading, setLoading] = useState(false)
  const { loading, loginFirebase, error } = useContext(UserContext);

  function handleLogin(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      loginFirebase(email, password);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <p>{error}</p>}
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
