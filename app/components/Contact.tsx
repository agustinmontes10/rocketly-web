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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section className="contact-section" id='contact'>
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {submitStatus === 'success' && (
              <div style={{ color: '#3fb950', marginTop: '10px', textAlign: 'center' }}>
                ✅ Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{ color: '#ff6b6b', marginTop: '10px', textAlign: 'center' }}>
                ❌ Error sending message. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>

  );
}
