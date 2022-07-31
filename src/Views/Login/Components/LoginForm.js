import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './LoginForm.module.css';
import stylesBtn from '../../../Components/Forms/Button.module.css'

//Form Components
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import useForm from '../../../Hooks/useForm';

//Helper Component
import Error from '../../../Components/Helper/Error';

//Global User Context
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
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <Error error={error}></Error>}
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
