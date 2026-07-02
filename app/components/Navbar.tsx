'use client';

import '../styles/components/navbar.scss';
import { Menu, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import { whatsappLink } from '../../lib/site';

const NAV_LINKS = [
  { id: 'services', key: 'navbar.services' },
  { id: 'howWork', key: 'navbar.about' },
  { id: 'projects', key: 'navbar.cases' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__container">
        <Link href="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logoRocketly.png" alt="Rocketly" />
        </Link>

        <nav className="navbar__nav">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className="navbar__link navbar__button"
              onClick={() => handleClick(link.id)}
            >
              {t(link.key)}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <div className="navbar__lang-toggle">
            <LanguageToggle />
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
          >
            {t('navbar.cta')}
          </a>

          {/* Mobile: WhatsApp siempre visible + hamburguesa */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta-mobile"
            aria-label={t('navbar.cta')}
          >
            <MessageCircle size={20} />
          </a>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className="navbar__mobile-link"
              onClick={() => handleClick(link.id)}
            >
              {t(link.key)}
            </button>
          ))}
        </nav>
        <div className="navbar__mobile-footer">
          <LanguageToggle />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta navbar__cta--full"
            onClick={() => setMenuOpen(false)}
          >
            {t('navbar.cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
