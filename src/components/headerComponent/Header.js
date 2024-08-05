import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartNavigation from './CartNavigation';

const Header = ({ cartItems, removeFromCart, updateQuantity, searchTerm, setSearchTerm, openProductModal }) => {

  return (
    <header className={`py-3 transition-all duration-300 sticky top-0 z-50`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-md-3 mb-3 mb-md-0">
            <Logo />
          </div>
          <div className="col-12 col-md-6 order-3 order-md-2 mb-3 mb-md-0">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-6 col-md-3 order-2 order-md-3 text-end">
            <CartNavigation
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              openProductModal={openProductModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;