import React from 'react';
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import Error from '../../../Components/Helper/Error';
import useForm from '../../../Hooks/useForm';
import useFirebase from '../../../Hooks/useFirebase';
import Head from '../../../Components/Helper/Head';
const LoginPasswordLost = () => {
  const email = useForm();
  const {lostPasswordFirebase, data, loading, error } = useFirebase();
  async function handleSubmit(e) {
    e.preventDefault();
    if (email.validate()) {
        await lostPasswordFirebase(email.value)
    }
  }

  return (
    <section>
      <Head title="Perdeu a senha" description="Recupere sua senha aqui"/>
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{color: '#4c1'}}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="text" name="email" {...email} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
