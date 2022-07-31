import React from 'react';
import Button from '../../../Components/Forms/Button';
import Input from '../../../Components/Forms/Input';
import useForm from '../../../Hooks/useForm';
import Error from '../../../Components/Helper/Error';
import useFirebase from '../../../Hooks/useFirebase';


const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const { error, loading, createUser} = useFirebase()

  async function handleCreateUser(e) {
    e.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      await createUser(username.value, email.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleCreateUser}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Criar Conta</Button>
        )}
        {error && <Error error={error}></Error>}
      </form>
    </section>
  );
};

export default LoginCreate;
