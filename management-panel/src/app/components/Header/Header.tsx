"use client"
import React from 'react'

export const Header = (props: any) => {
  return (
    <header>
        <nav>
            <ul>
                <li><a href="/user/signup">Cadastro</a></li>
                <li><a href="/user/login">Login</a></li>
            </ul>
        </nav>
    </header>
  )
}
