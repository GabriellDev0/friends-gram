import React from 'react';
import useFirebase from '../../Hooks/useFirebase';
import styles from './PostDelete.module.css';
const PostDelete = ({ id }) => {
  const { postDeleteFirebase, loading } = useFirebase();

  async function postDelete() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      await postDeleteFirebase(id);
      window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>Deletando...</button>
      ) : (
        <button onClick={postDelete} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PostDelete;
