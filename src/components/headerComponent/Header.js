import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartNavigation from './CartNavigation';

const Header = ({ cartItemCount }) => {
  return (
    <header className="bg-light py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Logo />
          </div>
          <div className="col-md-6">
            <SearchBar />
          </div>
          <div className="col-md-3">
            <CartNavigation cartItemCount={cartItemCount} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;