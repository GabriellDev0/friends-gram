import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useFirebase from '../../../Hooks/useFirebase';
import { ReactComponent as Posts } from '../../../Assets/feed.svg';
import { ReactComponent as Estatistics } from '../../../Assets/estatistics.svg';
import { ReactComponent as Add } from '../../../Assets/addPost.svg';
import { ReactComponent as LogOut } from '../../../Assets/logOut.svg';
import useMedia from '../../../Hooks/useMedia';
import styles from './UserHeaderNav.module.css';
const UhserHeaderNav = () => {
  const { logOutFirebase } = useFirebase();
  const mobile = useMedia('(max-width: 640px)');
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const {pathname} = useLocation()
  useEffect(()=>{
    setMobileMenu(false)
  }, [pathname])

  
  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <Posts />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatistics />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <Add />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={logOutFirebase}>
          <LogOut />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UhserHeaderNav;
