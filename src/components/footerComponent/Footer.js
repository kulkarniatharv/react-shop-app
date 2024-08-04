import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>We are a leading online shopping destination, offering a wide range of products at competitive prices.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Home</a></li>
              <li><a href="#" className="text-light">Products</a></li>
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>123 Shopping Street</p>
              <p>Shopville, SH 12345</p>
              <p>Email: info@shopapp.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} ShopApp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;