'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/components/languageToggle.scss';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(false); // Default to Spanish (false = ES, true = EN)

  useEffect(() => {
    // Initialize based on current language
    setIsEnglish(i18n.language === 'en');
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);

    // Save to localStorage
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="language-toggle">
      <span className={`language-label ${!isEnglish ? 'active' : ''}`}>ES</span>

      <div className="toggle">
        <input
          type="checkbox"
          id="language-btn"
          checked={isEnglish}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-btn">
          <div className="thumb"></div>
        </label>
      </div>

      <span className={`language-label ${isEnglish ? 'active' : ''}`}>EN</span>
    </div>
  );
}
