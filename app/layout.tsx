import RocketCursor from './components/RocketCursor';
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
    <html lang="en">
      <RocketCursor />
      <body>{children}</body>
    </html>
  );
}