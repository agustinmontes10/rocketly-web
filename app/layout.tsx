import RocketCursor from './components/RocketCursor';
import './styles/globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rocketly - Web Development Agency',
  description: 'We build modern web applications that help businesses grow',
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