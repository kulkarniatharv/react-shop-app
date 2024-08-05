import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../../styles/ProductModal.css';

const ProductModal = ({ product, closeModal, addToCart }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  if (!product) return null;

  const handleQuantityChange = (change) => {
    const newQuantity = quantityToAdd + change;
    if (newQuantity > 0 && newQuantity <= product.quantity) {
      setQuantityToAdd(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantityToAdd);
    closeModal();
  };

  return (
    <Modal show={!!product} onHide={closeModal} size="lg" centered className="product-modal">
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Row className="no-gutters">
          <Col md={6} className="product-modal-image-container">
            <img 
              src={product.imgUrl}
              className="product-modal-image img-fluid" 
              alt={product.title} 
            />
          </Col>
          <Col md={6} className="product-details">
            <div className="p-4">
              <h4 className="product-price mb-3">₹{product.price.toFixed(2)}</h4>
              <p className="product-category mb-2"><strong>Category:</strong> {product.category}</p>
              <p className="product-stock mb-3"><strong>In Stock:</strong> {product.quantity}</p>
              <div className="quantity-selector mb-3">
                <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)}>-</Button>
                <span className="quantity mx-3">{quantityToAdd}</span>
                <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}>+</Button>
              </div>
              <Button 
                variant="primary" 
                className="add-to-cart-btn mb-4"
                onClick={handleAddToCart}
                disabled={product.inCart}
              >
                {product.inCart ? 'In Cart' : 'Add to Cart'}
              </Button>
              <hr />
              <h5 className="mb-3">Product Description:</h5>
              <p className="product-description">{product.info}</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;