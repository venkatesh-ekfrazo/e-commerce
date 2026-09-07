import { Link, useParams } from "react-router-dom";
import products from "../data/Product.js";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  return (
    <div className="product-details">

      <div className="product-details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-details-info">

        <p className="product-brand">
          {product.brand}
        </p>

        <h1>{product.name}</h1>

        <p className="product-category">
          Category: {product.category}
        </p>

        <div className="product-rating">
          ⭐ {product.rating} / 5
          <span>
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="product-price">

          <span className="current-price">
            ₹{product.price}
          </span>

          <span className="original-price">
            ₹{product.originalPrice}
          </span>

          <span className="discount">
            {discount}% OFF
          </span>

        </div>

        <button
          className="cart-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <br />

        <Link
          to="/products"
          className="back-products"
        >
          ← Back to Products
        </Link>

      </div>

    </div>
  );
}

export default ProductDetails;