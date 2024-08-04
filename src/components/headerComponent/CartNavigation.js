import React from 'react';

const CartNavigation = ({ cartItemCount }) => {
  return (
    <div className="cart-navigation">
      <button className="btn btn-outline-primary">
        <i className="bi bi-cart"></i> Cart
        {cartItemCount > 0 && (
          <span className="badge bg-primary ms-1">{cartItemCount}</span>
        )}
      </button>
    </div>
  );
};

export default CartNavigation;