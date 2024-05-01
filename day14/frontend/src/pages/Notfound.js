import React from 'react'
import "../components/Notfound.css"

export const Notfound = () => {
    return (
        <div className="not-found-container">
          <h1 className='notfound'>404 - Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      );
    };