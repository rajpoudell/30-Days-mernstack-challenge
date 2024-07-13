import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./feedback.css";

const Feedback = () => {
  const [cmnt, setCmnt] = useState("");
  const [rating, setRating] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === null) {
      setError("Rating is required.");
      return;
    }
    setResponse(`Comment: ${cmnt}\nRating: ${rating}`);
    setCmnt("");
    setRating(null); // Reset rating after submission
    setError("");
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    setError(""); // Clear the error if rating is provided
  };

  return (
    <div>
      <h1>Feedback</h1>
      <div className="feedback-container">
        <div className="feedback-card">
          <form action="post" onSubmit={handleSubmit}>
            <textarea
              name="feedback"
              value={cmnt}
              onChange={(e) => setCmnt(e.target.value)}
              required
              placeholder="Write your feedback here..."
            ></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
        <div className="rating-card">
          <h2>Rate the Product</h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={26}
            activeColor="#ffd700"
            value={rating}
          />
          {rating !== null && <h3>Your rating: {rating}</h3>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <div className="response-card">
        <h2>Submitted Feedback</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Feedback;
