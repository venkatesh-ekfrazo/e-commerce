import { useNavigate } from "react-router-dom";

function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const navigate = useNavigate();

  // Calculate total price
  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const delivery = subtotal > 0 ? 50 : 0;

  const total = subtotal + delivery;

  return (
    <div class="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart.</p>
        </div>
      ) : (
        <>
          <div class="cart-items">
            {cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="cart-product-info">
                  <h2>{product.name}</h2>

                  <p>{product.brand}</p>

                  <p className="cart-price">₹{product.price}</p>

                  {/* Quantity */}
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(product.id)}>
                      −
                    </button>

                    <span>{product.quantity}</span>

                    <button onClick={() => increaseQuantity(product.id)}>
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>

                {/* Product Total */}
                <div className="item-total">
                  ₹{product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* Checkout */}
            <button
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
