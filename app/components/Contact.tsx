'use client';

import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/components/contact.scss'; // Podés ir migrándolo a Tailwind si te copa más

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
      <section className="contact-section">
        <div className="contact-overlay" />
        <div className="stars">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="star" />
          ))}
        </div>
        <div className="contact-content">
          <h1>
            Let’s <span>connect</span>
          </h1>
          <p>
            Ready to start your next project? Fill out the form and let's talk about how we can help your brand grow.
          </p>
          <form className="contact-form">
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" required></textarea>
            <button type="submit">Send message</button>
          </form>
        </div>
      </section>

  );
}
