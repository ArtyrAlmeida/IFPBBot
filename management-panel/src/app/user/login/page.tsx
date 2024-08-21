"use client"
import Input from '@/app/components/Input/TextInput';
import { NextPage } from 'next'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { createRef, useState } from 'react'

import styles from "../UserPage.module.css"

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
      <>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Entrar</h1>
          <div className={styles.inputFields}>
            <Input label='Email' input={{ id: "email", type: "text" }} ref={emailRef} />
            <Input label='Senha' input={{ id: "password", type: "password" }} ref={passwordRef} />
              {
                error 
                ?
                <span>{error}</span>
                :
                <span></span>
              }
          </div>
          <button className='button'>Entrar</button>
        </form>
      </>
    )
}

export default Login