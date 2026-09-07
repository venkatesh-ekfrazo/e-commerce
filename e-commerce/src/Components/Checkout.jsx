import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, placeOrder }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const delivery = subtotal > 0 ? 50 : 0;

  const total = subtotal + delivery;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Save the order
    placeOrder(formData);

    // Go to Orders page
    navigate("/orders");
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        {/* Delivery Address */}
        <div className="checkout-form">
          <h2>Delivery Address</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />

            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="4"
              required
            />

            <label>City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />

            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
            />

            {/* Payment */}
            <h2>Payment Method</h2>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={formData.payment === "Cash on Delivery"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={formData.payment === "UPI"}
                  onChange={handleChange}
                />
                UPI
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={formData.payment === "Card"}
                  onChange={handleChange}
                />
                Credit / Debit Card
              </label>
            </div>

            <button type="submit" className="place-order-button">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((product) => (
            <div className="checkout-product" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>

                <p>Quantity: {product.quantity}</p>

                <p>₹{product.price * product.quantity}</p>
              </div>
            </div>
          ))}

          <hr />

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
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
