import React, { useState } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import NotificationModal from './NotificationModal.js';
import '../../styles/CartModal.css';

const CartModal = ({ 
  show, 
  onHide, 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  totalPrice 
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.cartQuantity + change;
    
    if (newQuantity > item.quantity) {
      setToastMessage(`Sorry, only ${item.quantity} ${item.title}(s) available in stock.`);
      setShowToast(true);
    } else if (newQuantity < 1) {
      setNotificationMessage(`Do you want to remove ${item.title} from your cart?`);
      setItemToRemove(item);
      setShowNotificationModal(true);
    } else {
        console.log("updating quantity: ", newQuantity)
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setItemToRemove(null);
    }
    setShowNotificationModal(false);
  };

  return (
    <>
     <Modal show={show} onHide={onHide} size="lg" centered className="cart-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center">Your Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead mb-4">Your cart is empty.</p>
              <Button variant="primary" onClick={onHide}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div className="cart-item-image me-3">
                    <img src={item.imgUrl} alt={item.title} className="img-fluid rounded" />
                  </div>
                  <div className="cart-item-details flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1 item-title">{item.title}</h5>
                        <p className="mb-1 text-muted">Price: ₹{item.price.toFixed(2)}</p>
                        {/* <p className="mb-0 fw-bold">Total: ₹{(item.price * item.cartQuantity).toFixed(2)}</p> */}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          setNotificationMessage(`Do you want to remove ${item.title} from your cart?`);
                          setItemToRemove(item);
                          setShowNotificationModal(true);
                        }}
                        className="remove-btn"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <div className="quantity-control d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          -
                        </Button>
                        <span className="quantity mx-2">{item.cartQuantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="item-total ms-auto fw-bold">₹{(item.price * item.cartQuantity).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold">Total: <span className="text-primary">₹{totalPrice.toFixed(2)}</span></h4>
            <Button variant="outline-primary" onClick={onHide}>
              Continue Shopping
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide 
        className="position-fixed top-0 end-0 m-4"
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <NotificationModal
        show={showNotificationModal}
        onHide={() => setShowNotificationModal(false)}
        message={notificationMessage}
        onConfirm={handleRemoveItem}
      />
    </>
  );
};

export default CartModal;