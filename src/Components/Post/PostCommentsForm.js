import React, { useState } from 'react';
import styles from './PostCommentsForm.module.css'
import { ReactComponent as Enviar } from '../../Assets/send.svg';
import useFirebase from '../../Hooks/useFirebase';
import Error from '../../Components/Helper/Error'
const PostCommentsForm = ({ id, user, setComments }) => {
  const [comment, setComment] = useState('');
  const { commentPostFirebase, error }= useFirebase()
  console.log(comment)

 async function handleSubmit(e){
    e.preventDefault()
    if(comment !== ''){
      await commentPostFirebase(id, {user, comment})
      setComment('')
      //Pega todos os comentários anteriores como callback
      setComments((comments) => [...comments, {user,comment}])
    }else{
      window.alert('Comentário não pode ser vazio!')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error}/>
    </form>
  );
};

export default PostCommentsForm;
