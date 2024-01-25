import React from 'react'

export const Button = (props) => {
  return (
    <div>
        <button class="btn" onClick={props.increment}>{props.btn}</button>
        
    </div>
  )
}
