import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import '../../styles/Main.css';

const Main = ({
  products,
  filteredProducts,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
  openProductModal
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="container-xxl my-4 px-4 px-xxl-5 main-content">
      <div className="row">
        {/* Sidebar toggle button for mobile */}
        <div className="col-12 d-md-none mb-3 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={toggleSidebar}>
            {sidebarOpen ? 'Close Filters' : 'Open Filters'}
          </button>
        </div>
       
        <div className="col-md-3 mb-4">
          <Sidebar
            products={products}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            resetFilters={resetFilters}
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
       
        <div className="col-md-9">
          <ProductList
            products={filteredProducts}
            openProductModal={openProductModal}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;