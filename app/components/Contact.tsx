'use client';

import '../styles/components/contact.scss';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__info">
            <h2 className="heading heading--lg">Get in Touch</h2>
            <p>Ready to start your project? Contact us today and let's create something amazing together.</p>
            
            <div className="contact__details">
              <div className="contact__detail">
                <Mail size={24} />
                <span>hello@rocketly.dev</span>
              </div>
              <div className="contact__detail">
                <Phone size={24} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact__detail">
                <MapPin size={24} />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </div>
            </div>

            <div className="contact__image">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Office Space"
              />
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="form__group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />
            </div>

            <button type="submit" className="button button--primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}