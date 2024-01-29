// Home.js

import React from 'react';
import './Home.css'; // Import your CSS for styling

export const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Our Website!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam
        felis at dolor cursus, vitae gravida mauris facilisis. Quisque interdum,
        quam et venenatis viverra, nisi leo tincidunt ligula, eu vehicula velit
        justo vel ipsum.
      </p>
      <div className="image-container">
        <img
          src="https://placekitten.com/400/200"
          alt="Cute kitten"
          className="kitten-image"
        />
      </div>
    </div>
  );
};


