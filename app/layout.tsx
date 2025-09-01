import RocketCursor from './components/RocketCursor';
import './styles/globals.scss';
import type { Metadata } from 'next';
import I18nProvider from './components/I18nProvider';
import DynamicHtml from './components/DynamicHtml';

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
    <html lang="en">
      <RocketCursor />
      <body>
        <I18nProvider>
          <DynamicHtml>
            {children}
          </DynamicHtml>
        </I18nProvider>
      </body>
    </html>
  );
}