import { useState } from "react";
import OrderTracking from "./OrderTracking";

function Orders({ orders, cancelOrder }) {
  const [cancelConfirmation, setCancelConfirmation] = useState(null);

  // Check if order can be cancelled
  const canCancelOrder = (status) => {
    return status === "Order Placed" || status === "Packed";
  };

  // Handle cancel order click
  const handleCancelClick = (orderId) => {
    setCancelConfirmation(orderId);
  };

  // Handle confirm cancel
  const handleConfirmCancel = (orderId) => {
    cancelOrder(orderId);
    setCancelConfirmation(null);
  };

  // Handle close confirmation
  const handleCloseConfirmation = () => {
    setCancelConfirmation(null);
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const subtotal = order.products.reduce(
              (total, product) => total + product.price * product.quantity,
              0,
            );

            const delivery = subtotal > 0 ? 50 : 0;

            const total = subtotal + delivery;

            const orderStatus = order.status || "Confirmed";
            const isCancelled = orderStatus === "Cancelled";

            return (
              <div className="order-card" key={order.id}>
                {/* Order Header */}
                <div className="order-header">
                  <div>
                    <h2>Order #{order.id}</h2>

                    <p>Order Date: {order.date}</p>
                  </div>

                  <span
                    className={`order-status ${isCancelled ? "cancelled" : ""}`}
                  >
                    {isCancelled ? `${orderStatus} ❌` : orderStatus}
                  </span>
                </div>

                <hr />

                {/* Order Tracking */}
                <OrderTracking status={orderStatus} />

                <hr />

                {/* Products */}
                <div className="ordered-products">
                  <h3>Products</h3>

                  {order.products.map((product) => (
                    <div className="ordered-product" key={product.id}>
                      <img src={product.image} alt={product.name} />

                      <div className="ordered-product-info">
                        <h3>{product.name}</h3>

                        <p>Brand: {product.brand}</p>

                        <p>Quantity: {product.quantity}</p>

                        <strong>₹{product.price * product.quantity}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Price Summary */}
                <div className="order-summary">
                  <div>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <span>₹{delivery}</span>
                  </div>

                  <hr />

                  <div className="order-total">
                    <strong>Total</strong>

                    <strong>₹{total}</strong>
                  </div>
                </div>

                {/* Order Information */}
                <div className="order-details">
                  <h3>Order Details</h3>

                  <p>
                    <strong>Status:</strong> {orderStatus}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.customer?.payment || "Cash on Delivery"}
                  </p>

                  <p>
                    <strong>Delivery:</strong>{" "}
                    {isCancelled ? "Order Cancelled" : "Expected in 3–5 days"}
                  </p>
                </div>

                {/* Cancel Order Button */}
                {canCancelOrder(orderStatus) && (
                  <button
                    className="cancel-order-button"
                    onClick={() => handleCancelClick(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {cancelConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>Cancel Order?</h2>
            <p>Are you sure you want to cancel this order?</p>

            <div className="modal-buttons">
              <button
                className="modal-cancel-btn"
                onClick={handleCloseConfirmation}
              >
                No
              </button>

              <button
                className="modal-confirm-btn"
                onClick={() => handleConfirmCancel(cancelConfirmation)}
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
