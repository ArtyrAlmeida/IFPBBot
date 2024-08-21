"use client"
import React from 'react'
import styles from "./Input.module.css"

interface InputProps {
    input: { id: string, type: 'text' | 'password',  defaultValue?: string },
    label: string,
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {

    return (
      <div className={styles.inputBox}>
        <label className={styles.label} htmlFor={props.input.id}>{props.label}</label>
        <input className={styles.input}
          {...props.input}
          ref={ref}
        />
      </div>
    );
  });

export default TextInput