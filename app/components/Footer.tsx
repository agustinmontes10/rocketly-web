'use client';

import { Linkedin, Instagram, Mail } from 'lucide-react';
import '../styles/components/footer.scss';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-overlay" />
      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
      
      <div className="footer-content">
        <div className="footer-social">
          <a 
            href="https://linkedin.com/company/rocketly" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://instagram.com/rocketly.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="mailto:hello@rocketly.dev" 
            className="social-link"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
        
        <div className="footer-text">
          <p>&copy; 2025 Rocketly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
