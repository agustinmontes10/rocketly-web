import RocketCursor from './components/RocketCursor';
import I18nProvider from './components/I18nProvider';
import './styles/globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rocketly - Desarrollo Web',
  description: 'Desarrollo web moderno para tu negocio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <RocketCursor />
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}