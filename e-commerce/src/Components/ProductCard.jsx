import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, onViewReviews }) {
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : product.reviews;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <p className="brand">{product.brand}</p>

        <div className="discount-badge">{discount}% off</div>

        <h3>{product.name}</h3>

        <p className="rating" onClick={() => onViewReviews(product)}>
          ⭐ {product.rating}
          <span> ({reviewCount})</span>
        </p>

        <div className="price-section">
          <span className="price">₹{product.price}</span>

          <span className="original-price">₹{product.originalPrice}</span>
        </div>

        <div className="button-group">
          <button className="cart-button" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>

          <button
            className="reviews-button"
            onClick={() => onViewReviews(product)}
          >
            Reviews
          </button>

          <Link to={`/products/${product.id}`} className="details-button">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
