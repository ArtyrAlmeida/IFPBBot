"use client"
import React, { createRef } from 'react';
import { NextPage } from 'next';

import Input from '@/app/components/Input/Input';
import { signIn,  } from 'next-auth/react';

const SignUp: NextPage = () => {
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signIn
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
            <Input label='Nome' input={{ id: "name", type: "text" }} ref={nameRef} />
            <Input label='Email' input={{ id: "email", type: "text" }} ref={emailRef} />
            <Input label='Senha' input={{ id: "password", type: "password" }} ref={passwordRef} />
            <button>Cadastrar</button>
        </div>
      </form>
    </main>
  )
}

export default SignUp