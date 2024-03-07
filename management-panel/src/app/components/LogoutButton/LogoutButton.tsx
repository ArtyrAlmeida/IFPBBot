"use client"
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
        redirect('/user/login')
    }

    return (
        <button onClick={handleLogout}>Sair</button>
    )
}

export default LogoutButton;