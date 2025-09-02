'use client';

import { useEffect } from 'react';
import '../../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // La inicialización de i18n se hace en lib/i18n.ts
    // Este componente solo asegura que se ejecute en el cliente
  }, []);

  return <>{children}</>;
}
