import React, { useContext } from 'react';

//Router
import { Link } from 'react-router-dom';

// Styles Header
import styles from './Header.module.css';
import { ReactComponent as Friends } from '../../Assets/friends-icon.svg';

//Global User Context
import UserContext from '../../UserContext';

// Firebase EndPoint
import { logOutFirebase } from '../../Firebase/firebaseEndPoints'

const Header = () => {
  const user = useContext(UserContext);

  function logOut(){
    logOutFirebase()
  }
  
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Friendsgram - Home">
          <Friends width="40px" height="40px" />
        </Link>
        {user.currentUser ? (
          <Link className={styles.login} to="/conta">
            {user.displayName}
            <button onClick={logOut}>Sair</button>
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
