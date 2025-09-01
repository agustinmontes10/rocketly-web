'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/components/languageToggle.scss';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isSpanish, setIsSpanish] = useState(true); // Default to Spanish

  useEffect(() => {
    // Initialize based on current language
    setIsSpanish(i18n.language === 'es');
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLanguage = isSpanish ? 'en' : 'es';
    i18n.changeLanguage(newLanguage);
    setIsSpanish(!isSpanish);

    // Save to localStorage
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="language-toggle">
      <div className="language-labels">
        <span className={`language-label ${!isSpanish ? 'active' : ''}`}>EN</span>
        <span className={`language-label ${isSpanish ? 'active' : ''}`}>ES</span>
      </div>

      <div className="toggle">
        <input
          type="checkbox"
          id="language-btn"
          checked={isSpanish}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-btn">
          <div className="thumb"></div>
        </label>
      </div>
    </div>
  );
}
