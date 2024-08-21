"use client"
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "../Header.module.css"

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
        //redirect('/user/login');
        window.location.reload()
    }

    return (
        <a className={styles.button} onClick={handleLogout}>Sair</a>
    )
}

export default LogoutButton;