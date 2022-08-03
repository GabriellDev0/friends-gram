import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import { ReactComponent as Posts } from '../../Assets/posts.svg';
import { ReactComponent as Estatistics } from '../../Assets/estatistics.svg';
import { ReactComponent as Add } from '../../Assets/add.svg';
import { ReactComponent as LogOut } from '../../Assets/logout.svg';
import styles from './UserHeaderNav.module.css';
const UhserHeaderNav = () => {
  const [mobile, setMobile] = useState(null);
  const { logOutFirebase } = useFirebase();
  return (
    <nav className={styles.nav}>
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
  );
};

export default UhserHeaderNav;
