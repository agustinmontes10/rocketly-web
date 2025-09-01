'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import '../styles/components/languageToggle.scss';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isSpanish, setIsSpanish] = useState(false);

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
      <div className="language-toggle__container" onClick={toggleLanguage}>
        <div className="language-toggle__labels">
          <span className={`language-toggle__label ${!isSpanish ? 'active' : ''}`}>
            EN
          </span>
          <span className={`language-toggle__label ${isSpanish ? 'active' : ''}`}>
            ES
          </span>
        </div>
        
        <div className="language-toggle__track">
          <motion.div
            className="language-toggle__thumb"
            animate={{
              x: isSpanish ? 24 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </div>
      </div>
    </div>
  );
}
