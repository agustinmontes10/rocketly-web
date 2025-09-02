'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import '../styles/components/languageToggle.scss';

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Inicializar el estado basado en el idioma actual
        setIsChecked(i18n.language === 'en');
    }, [i18n.language]);

    const handleToggle = () => {
        const newLanguage = isChecked ? 'es' : 'en';
        i18n.changeLanguage(newLanguage);
        setIsChecked(!isChecked);

        // Guardar en localStorage
        localStorage.setItem('i18nextLng', newLanguage);
    };

    return (
        <div className="language-toggle" >
            <span className={`label ${!isChecked ? 'active' : ''}`}>ES</span>
            <div className="toggle" onClick={handleToggle}>

                <input
                    type="checkbox"
                    id="language-toggle"
                    checked={isChecked}
                />

                <label htmlFor="language-toggle">
                    <div className="thumb"></div>
                </label>

            </div>
            <span className={`label ${isChecked ? 'active' : ''}`}>EN</span>
        </div>
    );
}

