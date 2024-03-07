"use client"
import Input from '@/app/components/Input/Input';
import { NextPage } from 'next'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { createRef, useState } from 'react'

const Login: NextPage = () => {
    const router = useRouter();

    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
  
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const res = await signIn("credentials", {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          redirect: false
        });
        if (res?.error) {
          setError("Credenciais inválidas");
          console.log(res.error);
        }
        else {
          router.replace("/");
        }
        console.log(res?.status);
      } catch (error) {
        setError("Algo deu errado");
      }
    }
  
    return (
      <main>
        <form onSubmit={handleSubmit}>
          <div>
              <Input label='Email' input={{ id: "email", type: "text" }} ref={emailRef} />
              <Input label='Senha' input={{ id: "password", type: "text" }} ref={passwordRef} />
              <button>Login</button>
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

export default Login