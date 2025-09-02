import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar las traducciones
import esTranslation from '../locales/es.json';
import enTranslation from '../locales/en.json';

const resources = {
  es: {
    translation: esTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

// Solo inicializar si no está ya inicializado
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'es',
      lng: 'es', // Español por defecto
      debug: false,
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
