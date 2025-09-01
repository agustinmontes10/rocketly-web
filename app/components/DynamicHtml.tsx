'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DynamicHtmlProps {
  children: React.ReactNode;
}

export default function DynamicHtml({ children }: DynamicHtmlProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update the HTML lang attribute when language changes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  useEffect(() => {
    // Update document title based on language
    if (typeof document !== 'undefined') {
      const title = i18n.language === 'es' 
        ? 'Rocketly - Desarrollo Web' 
        : 'Rocketly - Web Development';
      document.title = title;
    }
  }, [i18n.language]);

  return <>{children}</>;
}
