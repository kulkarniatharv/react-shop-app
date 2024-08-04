import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <Modal show={!!product} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img 
          src={`https://via.placeholder.com/300x200?text=${product.name}`} 
          className="img-fluid mb-3" 
          alt={product.name} 
        />
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          // TODO: Implement add to cart functionality
          console.log('Adding to cart:', product);
          closeModal();
        }}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;