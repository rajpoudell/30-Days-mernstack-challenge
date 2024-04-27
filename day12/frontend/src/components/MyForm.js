import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}