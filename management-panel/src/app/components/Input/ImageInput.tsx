"use client"
import React from 'react'
import styles from "./Input.module.css"

interface InputProps {
    input: { id: string,  defaultValue?: string },
    label: string,
    onImageInputChange: (imageFile: File) => void,
    placeholder: string;
}

const ImageInput: React.FC<InputProps> = (props) => {
    return (
      <div className={styles.inputBox}>
        <label className={styles.label} htmlFor={props.input.id}>{props.label}</label>
        <label className={styles.imageInput} htmlFor={props.input.id}>
          <span className={styles.imageLabel}>{props.placeholder}</span>
          <input 
            accept="image/*"
            type="file"
            {...props.input}
            onChange={(e) => props.onImageInputChange(e.target.files?.item(0)!)}
          />
        </label>
      </div>
    );
  };

export default ImageInput;