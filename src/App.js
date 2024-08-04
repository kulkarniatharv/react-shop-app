import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/headerComponent/Header';
import Main from './components/mainComponent/Main';
import ProductModal from './components/productModalComponent/ProductModal';
import Footer from './components/footerComponent/Footer';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="app d-flex flex-column min-vh-100">
      <Header cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Main openProductModal={openProductModal} />
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