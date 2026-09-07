import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small-text">WELCOME TO SHOPKART</p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-description">
            Discover the latest mobiles, laptops, watches, audio, footwear and
            more at amazing prices.
          </p>

          <Link to="/products" className="shop-now-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="offer-strip">
        <div className="offer-chip">Top Offers</div>
        <div className="offer-chip">Grocery</div>
        <div className="offer-chip">Mobiles</div>
        <div className="offer-chip">Beauty</div>
        <div className="offer-chip">Electronics</div>
        <div className="offer-chip">Home & Kitchen</div>
        <div className="offer-chip">Gadgets</div>
      </section>

      <section className="top-deals-section">
        <div className="section-header-row">
          <div>
            <h2>Deals of the Day</h2>
            <p>Great bargains picked just for you</p>
          </div>
          <Link to="/products">View all</Link>
        </div>

        <div className="deals-grid">
          <Link
            to="/products?category=Mobiles"
            className="deal-card primary-card"
          >
            <span className="deal-label">Best Seller</span>
            <h3>Smartphones</h3>
            <p>From ₹8,999</p>
          </Link>

          <Link to="/products?category=Laptops" className="deal-card">
            <span className="deal-label">Limited Time</span>
            <h3>Laptops</h3>
            <p>Up to 40% off</p>
          </Link>

          <Link to="/products?category=Watches" className="deal-card">
            <span className="deal-label">Trending</span>
            <h3>Watches</h3>
            <p>Smart & classic</p>
          </Link>

          <Link to="/products?category=Audio" className="deal-card">
            <span className="deal-label">Audio</span>
            <h3>Headphones</h3>
            <p>Premium sound</p>
          </Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <p className="section-description">Explore our popular categories</p>

        <div className="category-grid">
          <Link to="/products?category=Mobiles" className="category-card">
            <div className="category-icon">📱</div>
            <h3>Mobiles</h3>
            <p>Latest smartphones</p>
          </Link>

          <Link to="/products?category=Laptops" className="category-card">
            <div className="category-icon">💻</div>
            <h3>Laptops</h3>
            <p>Powerful laptops</p>
          </Link>

          <Link to="/products?category=Watches" className="category-card">
            <div className="category-icon">⌚</div>
            <h3>Watches</h3>
            <p>Smart & stylish</p>
          </Link>

          <Link to="/products?category=Audio" className="category-card">
            <div className="category-icon">🎧</div>
            <h3>Audio</h3>
            <p>Premium sound</p>
          </Link>

          <Link to="/products?category=Accessories" className="category-card">
            <div className="category-icon">🔌</div>
            <h3>Accessories</h3>
            <p>Chargers & gear</p>
          </Link>

          <Link to="/products?category=Beauty" className="category-card">
            <div className="category-icon">✨</div>
            <h3>Beauty</h3>
            <p>Care & glow</p>
          </Link>

          <Link to="/products?category=Grocery" className="category-card">
            <div className="category-icon">🛒</div>
            <h3>Grocery</h3>
            <p>Daily essentials</p>
          </Link>

          <Link
            to="/products?category=Home & Kitchen"
            className="category-card"
          >
            <div className="category-icon">🏠</div>
            <h3>Home & Kitchen</h3>
            <p>Modern living</p>
          </Link>

          <Link to="/products?category=Appliances" className="category-card">
            <div className="category-icon">🧺</div>
            <h3>Appliances</h3>
            <p>Smart living</p>
          </Link>

          <Link to="/products?category=Gadgets" className="category-card">
            <div className="category-icon">⚡</div>
            <h3>Gadgets</h3>
            <p>Cool tech gear</p>
          </Link>

          <Link to="/products?category=Footwear" className="category-card">
            <div className="category-icon">👟</div>
            <h3>Footwear</h3>
            <p>Step in style</p>
          </Link>

          <Link to="/products?category=Sports" className="category-card">
            <div className="category-icon">🏏</div>
            <h3>Sports</h3>
            <p>Play like a pro</p>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Get your products delivered quickly and safely.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>Your payments are protected with secure checkout.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>Simple and hassle-free return experience.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
