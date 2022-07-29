import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Friends } from '../../Assets/friends-icon.svg';
import UserContext from '../../UserContext';
import { auth } from '../../Firebase/Config'
import { signOut } from 'firebase/auth';
const Header = () => {
  const user = useContext(UserContext);
 
  function logOut() {
    signOut(auth)
      .then(() => {
        console.log('deslogado com sucesso');
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <button onClick={logOut}></button>
        <Link className={styles.logo} to="/" aria-label="Friendsgram - Home">
          <Friends width="40px" height="40px" />
        </Link>
        {user ? (
          <Link className={styles.login} to="/conta">
            {user.displayName}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
