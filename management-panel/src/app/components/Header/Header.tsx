import { getServerSession } from 'next-auth';
import LogoutButton from './LogoutButton/LogoutButton';
import React from 'react'

import styles from "./Header.module.css";

export const Header = async (props: any) => {
  const session = await getServerSession();

  return (
    <header className={styles.header}>
      <a href='/' className={styles.logo}>IFPBBOT</a>
      <nav className={styles.navItems}>
        <a className={styles.linkText} href="/about">Sobre</a>
        {
          !session 
            ?
              (<><a className={styles.linkText} href="/user/signup">Cadastro</a>
              <a className={styles.button} href="/user/login">Login</a></>)
            :
              <><LogoutButton /></>
        } 
      </nav>
    </header>
  )
}
