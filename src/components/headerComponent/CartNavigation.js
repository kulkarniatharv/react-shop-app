import React, { useState, useMemo } from 'react';
import CartModal from './CartModal';

const CartNavigation = ({ cartItems, removeFromCart, updateQuantity, openProductModal }) => {
  const [showModal, setShowModal] = useState(false);

  const cartItemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.cartQuantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(() => 
    cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0),
    [cartItems]
  );

  return (
    <div className="cart-navigation">
      <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-cart"></i> Cart
        {cartItemCount > 0 && (
          <span className="badge bg-primary ms-1">{cartItemCount}</span>
        )}
      </button>

      <CartModal
        show={showModal}
        onHide={() => setShowModal(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
        openProductModal={openProductModal}
      />
    </div>
  );
};

export default CartNavigation;