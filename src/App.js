import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/headerComponent/Header';
import Main from './components/mainComponent/Main';
import ProductModal from './components/productModalComponent/ProductModal';
import Footer from './components/footerComponent/Footer';
import { getProducts } from './data/products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesPrice = (minPrice === '' || product.price >= Number(minPrice)) &&
                           (maxPrice === '' || product.price <= Number(maxPrice));
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice, selectedCategory, searchTerm]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product, quantityToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantityToAdd, item.quantity) }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          cartQuantity: Math.min(quantityToAdd, product.quantity)
        }];
      }
    });
  
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === product.id ? { ...item, inCart: true } : item
      )
    );
  };
  

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === productId ? { ...item, inCart: false } : item
      )
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id !== productId) {
          return item;
        }
  
        // Find the corresponding product in the products array to get the available quantity
        const product = products.find(p => p.id === productId);
        
        if (!product) {
          console.error(`Product with id ${productId} not found`);
          return item;
        }
  
        // Ensure the new quantity is within bounds (1 to available quantity)
        const updatedCartQuantity = Math.min(
          Math.max(newQuantity, 1),  // Ensure quantity is at least 1
          product.quantity           // Ensure quantity doesn't exceed available stock
        );
  
        return {
          ...item,
          cartQuantity: updatedCartQuantity
        };
      });
    });
  };
  

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSearchTerm('');
  };

  return (
    <div className="app d-flex flex-column min-vh-100">
      <Header
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openProductModal={openProductModal}
      />
      <Main
        products={products}
        filteredProducts={filteredProducts}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        resetFilters={resetFilters}
        openProductModal={openProductModal}
      />
      <ProductModal
        product={selectedProduct}
        closeModal={closeProductModal}
        addToCart={addToCart}
      />
      <Footer />
    </div>
  );
};

export default App;