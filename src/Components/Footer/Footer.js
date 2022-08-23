import React from 'react'
import styles from './Footer.module.css'
import { ReactComponent as Friends } from '../../Assets/friends-icon.svg';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Friends/>
      <p>FriendsGram. Alguns direitos reservados.</p>
    </footer>
  )
}

export default Footer