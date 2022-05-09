import React from 'react';

interface BProps {
    text : string,
    handleClick: () => void
}

const Button = ({ text, handleClick }: BProps) => {
  return (
    <div>
      <button onClick={() => handleClick()}>{text}</button>
    </div>
  )
}

export default Button