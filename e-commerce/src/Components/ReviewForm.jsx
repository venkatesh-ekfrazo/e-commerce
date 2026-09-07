import { useState } from "react";
import "../styles/ReviewForm.css";

function ReviewForm({ productId, onAddReview, onClose }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!reviewer.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a review title");
      return;
    }
    if (!comment.trim()) {
      setError("Please enter your review");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    const newReview = {
      id: Date.now(),
      productId,
      reviewer,
      rating,
      title,
      comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      helpful: 0,
    };

    onAddReview(newReview);
    setRating(5);
    setTitle("");
    setComment("");
    setReviewer("");
    onClose();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="reviewer">Your Name *</label>
        <input
          type="text"
          id="reviewer"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="Enter your name"
          maxLength="50"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating *</label>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${rating >= star ? "selected" : ""}`}
              onClick={() => setRating(star)}
              title={`${star} star${star !== 1 ? "s" : ""}`}
            >
              ⭐
            </button>
          ))}
          <span className="rating-display">{rating} out of 5 stars</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="title">Review Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength="100"
        />
        <span className="char-count">{title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="comment">Your Review *</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows="5"
          maxLength="500"
        />
        <span className="char-count">{comment.length}/500</span>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Submit Review
        </button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
