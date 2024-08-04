import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';

const Main = ({ openProductModal }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // TODO: Fetch products from API or load from local data
    const dummyProducts = [
      { id: 1, name: 'Product 1', price: 19.99, category: 'Category A' },
      { id: 2, name: 'Product 2', price: 29.99, category: 'Category B' },
      { id: 3, name: 'Product 3', price: 39.99, category: 'Category A' },
      // Add more dummy products as needed
    ];
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  const handleFilter = (filters) => {
    // TODO: Implement filtering logic
    console.log('Applying filters:', filters);
    // For now, we'll just set filtered products to all products
    setFilteredProducts(products);
  };

  return (
    <main className="container my-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar onFilter={handleFilter} />
        </div>
        <div className="col-md-9">
          <ProductList products={filteredProducts} openProductModal={openProductModal} />
        </div>
      </div>
    </main>
  );
};

export default Main;