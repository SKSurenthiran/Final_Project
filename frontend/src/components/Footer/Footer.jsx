import React from 'react';
import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h4>About Us</h4>
        <p> Explore the seamless integration of technology and service excellence
          with our innovative solutions. From personalized appointments to
          efficient inventory management, we are committed to delivering
          exceptional customer experiences. Join us in redefining automotive
          service standards with precision and care.</p>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email:splasherz@gmail.com</p>
        <p>Phone: 0214567890</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <ul className="social-links">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 splasherz. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer