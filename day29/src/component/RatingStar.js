import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const RatingStar = () => {
    const [rating, setRating] = useState(null);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating)
  };
  return (
    <div>
      RatingStar
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
      <h1>

      Your rating for the product is {rating}
      </h1>

    </div>
  );
};

export default RatingStar;
