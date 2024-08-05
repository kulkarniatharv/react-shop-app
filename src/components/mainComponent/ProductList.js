import React, {useState, useEffect, useRef, useCallback} from 'react';
import { createPopper } from '@popperjs/core';
import '../../styles/ProductList.css';

const ProductList = ({ products, openProductModal }) => {
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [popperInstance, setPopperInstance] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const imageRefs = useRef({});
    const overlayRef = useRef(null);
  
    const createPopperInstance = useCallback((product) => {
      if (imageRefs.current[product.id] && overlayRef.current) {
        return createPopper(imageRefs.current[product.id], overlayRef.current, {
          placement: 'top',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'clippingParents',
                padding: 10,
              },
            },
          ],
          onFirstUpdate: () => {
            // Delay showing the overlay to ensure smooth transition
            setTimeout(() => setShowOverlay(true), 50);
          },
        });
      }
      return null;
    }, []);
  
    useEffect(() => {
      if (hoveredProduct) {
        const instance = createPopperInstance(hoveredProduct);
        setPopperInstance(instance);
      } else {
        setShowOverlay(false);
        if (popperInstance) {
          popperInstance.destroy();
          setPopperInstance(null);
        }
      }
  
      return () => {
        if (popperInstance) {
          popperInstance.destroy();
          setPopperInstance(null);
        }
      };
    }, [hoveredProduct, createPopperInstance]);
  
    const handleMouseEnter = (product) => {
      setHoveredProduct(product);
    };
  
    const handleMouseLeave = () => {
      setHoveredProduct(null);
    };
  
    return (
      <div className="product-list">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map(product => (
          <div className="col" key={product.id}>
            <div className="card product-card">
              <div 
                className={`product-image-container ${hoveredProduct === product ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(product)}
                onMouseLeave={handleMouseLeave}
                ref={el => imageRefs.current[product.id] = el}
              >
                <img 
                  src={product.imgUrl} 
                  className="card-img-top product-list-image" 
                  alt={product.title} 
                />
                <span className="category-badge">
                  {product.category}
                </span>
              </div>
              <div className="card-body">
                <div className="product-info">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text price">₹{product.price.toFixed(2)}</p>
                </div>
                <button
                  className="btn btn-outline-dark rounded-circle arrow-button"
                  onClick={() => openProductModal(product)}
                  aria-label="View product details"
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        {hoveredProduct && (
          <div 
            ref={overlayRef} 
            className={`image-overlay ${showOverlay ? 'show' : ''}`}
          >
            <img src={hoveredProduct.imgUrl} alt={hoveredProduct.title} />
          </div>
        )}
      </div>
    );
  };

export default ProductList;