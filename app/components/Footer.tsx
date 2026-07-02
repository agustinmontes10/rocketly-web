'use client';

import { Linkedin, Instagram, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/components/footer.scss';
import { whatsappLink, CONTACT_EMAIL } from '../../lib/site';

const NAV_LINKS = [
  { id: 'services', key: 'footer.services' },
  { id: 'casos', key: 'footer.cases' },
  { id: 'howWork', key: 'footer.about' },
];

export default function Footer() {
  const { t } = useTranslation();

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/assets/logoRocketly.png" alt="Rocketly" className="footer-logo" />
          <p className="footer-tagline">{t('footer.tagline')}</p>
        </div>

        <nav className="footer-nav">
          {NAV_LINKS.map(link => (
            <button key={link.id} className="footer-nav-link" onClick={() => handleClick(link.id)}>
              {t(link.key)}
            </button>
          ))}
        </nav>

        <div className="footer-social">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
            <MessageCircle size={22} />
          </a>
          <a href="https://www.instagram.com/rocketly_/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <Instagram size={22} />
          </a>
          <a href="https://www.linkedin.com/company/rocketly-company/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <Linkedin size={22} />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="social-link" aria-label="Email">
            <Mail size={22} />
          </a>
        </div>

        <div className="footer-text">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
