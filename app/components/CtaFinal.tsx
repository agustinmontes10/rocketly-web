'use client';

import '../styles/components/ctaFinal.scss';
import { MessageCircle, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { whatsappLink, CONTACT_EMAIL } from '../../lib/site';

export default function CtaFinal() {
  const { t } = useTranslation();

  return (
    <section className="ctaFinal" id="contacto">
      <div className="ctaFinal__content">
        <h2 className="heading heading--lg">
          {t('ctaFinal.title')} <span className="text-gradient">{t('ctaFinal.titleHighlight')}</span>
        </h2>
        <p className="ctaFinal__subtitle">{t('ctaFinal.subtitle')}</p>

        <div className="ctaFinal__buttons">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary ctaFinal__whatsapp"
          >
            <MessageCircle size={20} />
            {t('ctaFinal.ctaPrimary')}
          </a>
        </div>

        <a href={`mailto:${CONTACT_EMAIL}`} className="ctaFinal__email">
          <Mail size={16} />
          <span>{t('ctaFinal.emailLabel')} {CONTACT_EMAIL}</span>
        </a>
      </div>
    </section>
  );
}
