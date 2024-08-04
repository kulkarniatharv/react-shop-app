import React, { useState } from 'react';

const Sidebar = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    onFilter({ priceRange, categories: selectedCategories });
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>
      <div className="mb-3">
        <label htmlFor="priceRange" className="form-label">Max Price: ${priceRange[1]}</label>
        <input
          type="range"
          className="form-range"
          id="priceRange"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>
      <div className="mb-3">
        <h4>Categories</h4>
        {['Category A', 'Category B', 'Category C'].map(category => (
          <div className="form-check" key={category}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category}
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
    </aside>
  );
};

export default Sidebar;