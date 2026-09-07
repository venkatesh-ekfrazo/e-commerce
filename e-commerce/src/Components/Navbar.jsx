import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Navbar({ cartCount, user, logoutUser }) {
  const categories = [
    "Mobiles",
    "Laptops",
    "Watches",
    "Audio",
    "Accessories",
    "Beauty",
    "Grocery",
    "Home & Kitchen",
    "Appliances",
    "Gadgets",
    "Footwear",
    "Men's Fashion",
    "Sports",
  ];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  return (
    <nav className="navbar">
      <div className="top-header">
        <div className="logo-block">
          <Link to="/" className="logo">
            ShopKart
          </Link>
          <span className="explore-plus">Explore Plus</span>
        </div>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="search-box"
            value={searchParams.get("search") || ""}
            onChange={handleSearch}
          />
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <span className="welcome-user">Welcome, {user.email}</span>

              <button className="logout-btn" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}

          <span className="seller-link">Become a Seller</span>

          <div
            className="category-dropdown"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button
              type="button"
              className="category-toggle"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              More
            </button>

            {isCategoryOpen && (
              <div className="category-menu">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className="cart">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </div>

      <div className="category-row">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <div
          className="category-dropdown category-dropdown-row"
          onMouseEnter={() => setIsCategoryOpen(true)}
          onMouseLeave={() => setIsCategoryOpen(false)}
        >
          <button
            type="button"
            className="category-toggle"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            Category
          </button>

          {isCategoryOpen && (
            <div className="category-menu">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  );
}

export default Navbar;
