"use client"
import React from 'react'

interface InputProps {
    input: { id: string,  defaultValue?: string },
    label: string,
    onImageInputChange: (imageFile: File) => void,
}

const ImageInput: React.FC<InputProps> = (props) => {
    return (
      <div className='form-input'>
        <label className="form-label" htmlFor={props.input.id}>{props.label}</label>
        <input className="form-control"
          accept="image/*"
          type="file"
          {...props.input}
          onChange={(e) => props.onImageInputChange(e.target.files?.item(0)!)}
        />
      </div>
    );
  };

export default ImageInput;