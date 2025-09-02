'use client';

import '../styles/components/navbar.scss';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setSelected(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__container">
        <Link href="/" className="navbar__logo">
          <img src="/assets/logoRocketly.png" alt="Rocketly" />
        </Link>

        <nav className="navbar__nav">
          <button
            className={`navbar__link navbar__button ${selected === 'hero' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('hero')}
          >
            {t('navbar.home')}
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'projects' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('projects')}
          >
            {t('navbar.projects')}
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'services' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('services')}
          >
            {t('navbar.services')}
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'contact' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('contact')}
          >
            {t('navbar.contact')}
          </button>
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}
