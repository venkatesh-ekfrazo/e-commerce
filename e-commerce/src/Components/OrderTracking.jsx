function OrderTracking({ status }) {
  // Define tracking steps based on status
  const getTrackingSteps = () => {
    if (status === "Cancelled") {
      return [
        { label: "Order Placed", value: "Order Placed" },
        { label: "Packed", value: "Packed" },
        { label: "Cancelled", value: "Cancelled" },
      ];
    }

    // Default tracking for active orders
    return [
      { label: "Order Placed", value: "Order Placed" },
      { label: "Packed", value: "Packed" },
      { label: "Shipped", value: "Shipped" },
      { label: "Delivered", value: "Delivered" },
    ];
  };

  // Determine which steps are completed
  const getStepStatus = (stepValue) => {
    const steps = [
      "Order Placed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(stepValue);

    if (stepValue === "Cancelled" && status === "Cancelled") {
      return "completed";
    }

    if (stepIndex < currentIndex) {
      return "completed";
    } else if (stepIndex === currentIndex) {
      return "active";
    } else {
      return "pending";
    }
  };

  const trackingSteps = getTrackingSteps();

  return (
    <div className="order-tracking">
      <div className="tracking-container">
        {trackingSteps.map((step, index) => (
          <div key={step.value} className="tracking-wrapper">
            {/* Step Circle */}
            <div className={`tracking-step ${getStepStatus(step.value)}`}>
              <div className="step-circle">
                {getStepStatus(step.value) === "completed" ? (
                  <span className="step-icon">✓</span>
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
              <p className="step-label">{step.label}</p>
            </div>

            {/* Connector Line (not shown after last step) */}
            {index < trackingSteps.length - 1 && (
              <div
                className={`tracking-line ${
                  getStepStatus(step.value) === "completed"
                    ? "completed"
                    : "pending"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;
