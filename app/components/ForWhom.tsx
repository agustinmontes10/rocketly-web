'use client';

import '../styles/components/forWhom.scss';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { whatsappLink } from '../../lib/site';

export default function ForWhom() {
  const { t } = useTranslation();
  const bullets = t('forWhom.bullets', { returnObjects: true }) as unknown as string[];

  return (
    <section className="forWhom" id="paraQuien">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('forWhom.title')} <span className="text-gradient">{t('forWhom.titleHighlight')}</span>
        </h2>

        <p className="forWhom__paragraph">{t('forWhom.paragraph')}</p>

        <ul className="forWhom__list">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              className="forWhom__item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            >
              <span className="forWhom__check"><Check size={16} strokeWidth={3} /></span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        <div className="forWhom__cta">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            {t('forWhom.cta')}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
