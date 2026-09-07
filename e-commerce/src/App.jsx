import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";
import Orders from "./Components/Orders";
import Login from "./Components/Login";
import Register from "./Components/Register";
import products from "./data/Product.js";

import "./index.css";

function App() {
  // Products stock state
  const [productsStock, setProductsStock] = useState(() => {
    const savedStock = localStorage.getItem("productsStock");

    if (savedStock) {
      return JSON.parse(savedStock);
    }

    // Initialize stock from products
    const initialStock = {};

    products.forEach((product) => {
      initialStock[product.id] = product.stock || 10;
    });

    return initialStock;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // User state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Add product to cart
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
      };

      updatedCart = [...cart, newProduct];
    }

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Increase quantity
  function increaseQuantity(productId) {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Decrease quantity
  function decreaseQuantity(productId) {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Remove product
  function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Place order
  function placeOrder(orderDetails) {
    // Decrement stock for each product in cart
    const updatedStock = { ...productsStock };

    cart.forEach((item) => {
      updatedStock[item.id] = (updatedStock[item.id] || 0) - item.quantity;
    });

    setProductsStock(updatedStock);

    localStorage.setItem("productsStock", JSON.stringify(updatedStock));

    const newOrder = {
      id: `SK${Date.now()}`,
      products: cart,
      customer: orderDetails,
      date: new Date().toLocaleDateString(),
      status: "Order Placed",
    };

    const updatedOrders = [...orders, newOrder];

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear cart
    setCart([]);

    localStorage.removeItem("cart");
  }

  // Cancel order
  function cancelOrder(orderId) {
    const order = orders.find((o) => o.id === orderId);

    if (!order) return;

    // Restore stock for each product in the order
    const updatedStock = { ...productsStock };

    order.products.forEach((item) => {
      updatedStock[item.id] = (updatedStock[item.id] || 0) + item.quantity;
    });

    setProductsStock(updatedStock);

    localStorage.setItem("productsStock", JSON.stringify(updatedStock));

    // Update order status to Cancelled
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Cancelled" } : o,
    );

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  // Login user
  function loginUser(userData) {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  }

  // Register user
  function registerUser(userData) {
    localStorage.setItem("registeredUser", JSON.stringify(userData));
  }

  // Logout user
  function logoutUser() {
    setUser(null);

    localStorage.removeItem("user");
  }

  return (
    <>
      <Navbar cartCount={cart.length} user={user} logoutUser={logoutUser} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductList addToCart={addToCart} />}
        />

        {/* Product Details */}
        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout cart={cart} placeOrder={placeOrder} />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders orders={orders} cancelOrder={cancelOrder} />}
        />

        {/* Login */}
        <Route path="/login" element={<Login loginUser={loginUser} />} />

        {/* Register */}
        <Route
          path="/register"
          element={<Register registerUser={registerUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
