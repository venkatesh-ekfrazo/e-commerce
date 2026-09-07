import { useState } from "react";
import ReviewForm from "./ReviewForm";
import "../styles/ReviewModal.css";

function ReviewModal({ product, isOpen, onClose, onAddReview }) {
  const [activeTab, setActiveTab] = useState("reviews");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews.length})
          </button>
          <button
            className={`tab ${activeTab === "form" ? "active" : ""}`}
            onClick={() => setActiveTab("form")}
          >
            Write Review
          </button>
        </div>

        <div className="modal-body">
          {activeTab === "reviews" && (
            <div className="reviews-list">
              {product.reviews.length === 0 ? (
                <p className="no-reviews">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <>
                  <div className="rating-summary">
                    <div className="rating-score">
                      <h3>{product.rating}</h3>
                      <p className="stars">
                        {"⭐".repeat(Math.round(product.rating))}
                      </p>
                      <p className="rating-count">
                        Based on {product.reviews.length} reviews
                      </p>
                    </div>

                    <div className="rating-distribution">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = product.reviews.filter(
                          (r) => r.rating === star,
                        ).length;
                        const percentage =
                          product.reviews.length > 0
                            ? (count / product.reviews.length) * 100
                            : 0;
                        return (
                          <div key={star} className="rating-bar">
                            <span>{star}★</span>
                            <div className="bar">
                              <div
                                className="fill"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="individual-reviews">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4>{review.reviewer}</h4>
                            <span className="review-rating">
                              {"⭐".repeat(review.rating)}
                              <span className="rating-text">
                                {review.rating}/5
                              </span>
                            </span>
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-title">{review.title}</p>
                        <p className="review-text">{review.comment}</p>
                        {review.helpful && (
                          <div className="helpful-count">
                            👍 {review.helpful} found this helpful
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "form" && (
            <ReviewForm
              productId={product.id}
              onAddReview={onAddReview}
              onClose={() => setActiveTab("reviews")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
