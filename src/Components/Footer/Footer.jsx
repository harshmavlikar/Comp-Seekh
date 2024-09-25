import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>ComputerSeekho</h1>
        </div>
        <div className="footer-links">
          <div className="footer-link-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-link-column">
            <h3>Follow Us</h3>
            <div className="footer-social"> 
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><IoLocationOutline /> 1234 Mumbai, Maharashtra</p>
            <p><IoCallOutline /> +123 456 7890</p>
            <p><MdMail /> support@ComputerSeekho.com</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ComputerSeekho. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
