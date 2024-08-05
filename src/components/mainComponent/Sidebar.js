import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import '../../styles/Sidebar.css';

const Sidebar = ({
  products,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
  isOpen,
  toggleSidebar
}) => {
  const categories = [...new Set(products.map(product => product.category))];
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(product => product.price);
      const minProductPrice = Math.min(...prices);
      const maxProductPrice = Math.max(...prices);
      setPriceRange([minProductPrice, maxProductPrice]);
     
      if (minPrice === '') setMinPrice(minProductPrice);
      if (maxPrice === '') setMaxPrice(maxProductPrice);
    }
  }, [products, setMinPrice, setMaxPrice]);

  const handlePriceChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const formatPrice = (value) => `₹${value.toLocaleString()}`;

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <aside className="sidebar">
        <button className="sidebar-close d-md-none" onClick={toggleSidebar}>
          &times;
        </button>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Filters</h3>
          <div className="filter-section">
            <h4 className="filter-heading">Price Range</h4>
            <ReactSlider
              className="price-slider"
              thumbClassName="price-slider-thumb"
              trackClassName="price-slider-track"
              value={[Number(minPrice) || priceRange[0], Number(maxPrice) || priceRange[1]]}
              min={priceRange[0]}
              max={priceRange[1]}
              onChange={handlePriceChange}
              minDistance={10}
              pearling
            />
            <div className="price-range-display">
              <span>{formatPrice(Number(minPrice) || priceRange[0])}</span>
              <span>{formatPrice(Number(maxPrice) || priceRange[1])}</span>
            </div>
          </div>
          <div className="filter-section">
            <h4 className="filter-heading">Categories</h4>
            <div className="category-list">
              <button
                className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-reset" onClick={resetFilters}>Reset Filters</button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;