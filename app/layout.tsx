import RocketCursor from './components/RocketCursor';
import I18nProvider from './components/I18nProvider';
import './styles/globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rocketly - Desarrollo Web',
  description: 'Desarrollo web moderno para tu negocio',
  keywords: 'desarrollo web, React, Next.js, TypeScript, diseño web, programación',
  authors: [{ name: 'Rocketly' }],
  creator: 'Rocketly',
  publisher: 'Rocketly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rocketly.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Rocketly - Desarrollo Web',
    description: 'Desarrollo web moderno para tu negocio',
    url: 'https://rocketly.vercel.app',
    siteName: 'Rocketly',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocketly - Desarrollo Web',
    description: 'Desarrollo web moderno para tu negocio',
    creator: '@rocketly',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <RocketCursor />
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}