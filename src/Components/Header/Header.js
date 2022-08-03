import React, { useContext } from 'react';

//Router
import { Link } from 'react-router-dom';

// Styles Header
import styles from './Header.module.css';
import { ReactComponent as Friends } from '../../Assets/friends-icon.svg';

//Global User Context
import UserContext from '../../UserContext';


const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Friendsgram - Home">
          <Friends width="40px" height="40px" />
        </Link>
        {currentUser ? (
          <Link className={styles.login} to="/conta">
            {currentUser.displayName}
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
