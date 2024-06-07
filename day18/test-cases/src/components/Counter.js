import React, { useState } from 'react'
const Counter = () => {
    const [initialValue, setInitialValue] = useState(0)
    const Increment=()=>{
        setInitialValue((initialValue)=>(initialValue +5))
        console.log(initialValue);
    }
    const Decrement =()=>{
        setInitialValue(initialValue =>initialValue -5)
        console.log(initialValue);
    }
    function Reset(){
        console.log(initialValue);
        setInitialValue(0)
    }
  return (
    <>
        <p>{initialValue}</p>
        <button onClick={Increment}>Increment by 5</button>
        <button onClick={Reset}>Reset</button>
        <button onClick={Decrement}>Decrement by 5</button>
    </>
  )
}

export default Counter;