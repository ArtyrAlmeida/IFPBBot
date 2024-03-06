"use client"
import React, { createRef, useState } from 'react';
import { NextPage } from 'next';

import Input from '@/app/components/Input/Input';
import { useRouter } from 'next/navigation';

const SignUp: NextPage = () => {
  const router = useRouter();

  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        name: nameRef.current?.value,
      })
    });
    const json = await res.json()
    if (!res.ok) {
      setError(json.message || "Não foi possível cadastrar");
    } else {
      router.replace("/user/login");
      
    }

  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
            <Input label='Nome' input={{ id: "name", type: "text" }} ref={nameRef} />
            <Input label='Email' input={{ id: "email", type: "text" }} ref={emailRef} />
            <Input label='Senha' input={{ id: "password", type: "password" }} ref={passwordRef} />
            <button>Cadastrar</button>
            {
              error 
              ?
                <span>{error}</span>
              :
                <span></span>
            }
        </div>
      </form>
    </main>
  )
}

export default SignUp