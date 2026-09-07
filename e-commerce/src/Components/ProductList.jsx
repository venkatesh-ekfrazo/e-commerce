import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import products from "../data/Product.js";
import ProductCard from "./productcard.jsx";
import ReviewModal from "./ReviewModal";

function ProductList({ addToCart }) {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search");
  const selectedPrice = searchParams.get("price");
  const selectedSort = searchParams.get("sort");

  // Update one filter without removing the other filters
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();

    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  // Clear all filters
  const clearFilters = () => {
    navigate("/products");
  };

  const [productsData, setProductsData] = useState(
    products.map((product) => ({
      ...product,
      reviews: product.reviewList || [],
    })),
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReviews = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddReview = (newReview) => {
    setProductsData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === newReview.productId
          ? {
              ...product,
              reviews: [...product.reviews, newReview],
              rating: calculateNewRating(product.reviews, newReview),
            }
          : product,
      ),
    );

    setSelectedProduct((prev) => {
      if (prev && prev.id === newReview.productId) {
        return {
          ...prev,
          reviews: [...prev.reviews, newReview],
          rating: calculateNewRating(prev.reviews, newReview),
        };
      }

      return prev;
    });
  };

  const calculateNewRating = (currentReviews, newReview) => {
    const totalRating = currentReviews.reduce((sum, r) => sum + r.rating, 0);

    return (
      (totalRating + newReview.rating) /
      (currentReviews.length + 1)
    ).toFixed(1);
  };

  // Filter products
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesPrice = selectedPrice
      ? product.price <= Number(selectedPrice)
      : true;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];

  if (selectedSort === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (selectedSort === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (selectedSort === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      {/* Price Filter */}
      <div className="price-filter">
        <span>Price:</span>

        <button onClick={() => updateFilter("price", "5000")}>
          Under ₹5,000
        </button>

        <button onClick={() => updateFilter("price", "10000")}>
          Under ₹10,000
        </button>

        <button onClick={() => updateFilter("price", "50000")}>
          Under ₹50,000
        </button>
      </div>

      {/* Sort Products */}
      <div className="sort-filter">
        <span>Sort:</span>

        <button onClick={() => updateFilter("sort", "price-low")}>
          Price: Low → High
        </button>

        <button onClick={() => updateFilter("sort", "price-high")}>
          Price: High → Low
        </button>

        <button onClick={() => updateFilter("sort", "rating")}>
          Rating: High → Low
        </button>
      </div>

      {/* Clear Filters */}
      <button className="clear-filter-button" onClick={clearFilters}>
        Clear All Filters
      </button>

      {/* Products */}
      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewReviews={handleViewReviews}
            />
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>

      {/* Review Modal */}
      {selectedProduct && (
        <ReviewModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddReview={handleAddReview}
        />
      )}
    </>
  );
}

export default ProductList;
