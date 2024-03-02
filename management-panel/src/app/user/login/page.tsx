"use client"
import Input from '@/app/components/Input/Input';
import { NextPage } from 'next'
import { signIn } from 'next-auth/react';
import React, { createRef } from 'react'

const Login: NextPage = () => {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false
      });
    }
  
    return (
      <main>
        <form onSubmit={handleSubmit}>
          <div>
              <Input label='Email' input={{ id: "email", type: "text" }} ref={emailRef} />
              <Input label='Senha' input={{ id: "password", type: "text" }} ref={passwordRef} />
              <button>Login</button>
          </div>
        </form>
      </main>
    )
}

export default Login