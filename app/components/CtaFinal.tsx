'use client';

import { motion } from 'framer-motion';
import '../styles/components/ctaFinal.scss';
import { MessageCircle, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { whatsappLink, CONTACT_EMAIL } from '../../lib/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function CtaFinal() {
  const { t } = useTranslation();

  return (
    <section className="ctaFinal" id="contacto">
      <motion.div
        className="ctaFinal__content"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2 variants={item} className="heading heading--lg">
          {t('ctaFinal.title')} <span className="text-gradient">{t('ctaFinal.titleHighlight')}</span>
        </motion.h2>
        <motion.p variants={item} className="ctaFinal__subtitle">{t('ctaFinal.subtitle')}</motion.p>

        <motion.div variants={item} className="ctaFinal__buttons">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary ctaFinal__whatsapp"
          >
            <MessageCircle size={20} />
            {t('ctaFinal.ctaPrimary')}
          </motion.a>
        </motion.div>

        <motion.a variants={item} href={`mailto:${CONTACT_EMAIL}`} className="ctaFinal__email">
          <Mail size={16} />
          <span>{t('ctaFinal.emailLabel')} {CONTACT_EMAIL}</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
