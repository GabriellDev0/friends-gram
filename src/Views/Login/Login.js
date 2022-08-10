import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import LoginCreate from './Components/LoginCreate';
import LoginPasswordLost from './Components/LoginPasswordLost';
import LoginPasswordReset from './Components/LoginPasswordReset';
import NotFound from '../../NotFound';
import UserContext from '../../UserContext';
import styles from './Login.module.css';
const Login = () => {
  const { currentUser, emailVerified } = React.useContext(UserContext);

  if (emailVerified === true && currentUser !== null  ) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
