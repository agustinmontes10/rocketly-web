'use client';

import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Toast from './Toast';
import '../styles/components/contact.scss';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

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
        setToastMessage(t('contact.successMessage'));
        setToastType('success');
        setShowToast(true);
      } else {
        setSubmitStatus('error');
        setToastMessage(t('contact.errorMessage'));
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setToastMessage(t('contact.connectionError'));
      setToastType('error');
      setShowToast(true);
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
            {t('contact.title')} <span>{t('contact.titleHighlight')}</span>
          </h1>
          <p>
            {t('contact.description')}
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t('contact.namePlaceholder')}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('contact.sendingButton') : t('contact.sendButton')}
            </button>

          </form>
        </div>

        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      </section>

  );
}
