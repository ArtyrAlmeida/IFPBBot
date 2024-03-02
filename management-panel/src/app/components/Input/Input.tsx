"use client"
import React, { ForwardedRef } from 'react'

interface InputProps {
    input: { id: string, type: 'text' | 'password' },
    label: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {

    return (
      <div className='form-input'>
        <label className="form-label" htmlFor={props.input.id}>{props.label}</label>
        <input className="form-control"
          {...props.input}
          ref={ref}
        />
      </div>
    );
  });

export default Input