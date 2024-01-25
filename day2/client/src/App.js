

import { useState } from 'react';
import { Button } from './components/Button';
function App() {

  const [increment,setIncrement] =useState(0);
  
  const handleIncrement = () =>{
    setIncrement( increment+2)
  }
  return (
    <div className="App">
      <p>{increment}</p>
      <Button increment={handleIncrement} btn = "Click to increment of 2"/>

    </div>
  );
}

export default App;
