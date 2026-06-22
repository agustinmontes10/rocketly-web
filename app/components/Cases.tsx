'use client';

import '../styles/components/cases.scss';
import { motion } from 'framer-motion';
import { Building2, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { handleSpotlight } from '../../lib/spotlight';

export default function Cases() {
  const { t } = useTranslation();

  const cases = [
    {
      icon: <Building2 size={22} />,
      sector: t('cases.case1.sector'),
      problem: t('cases.case1.problem'),
      solution: t('cases.case1.solution'),
      result: t('cases.case1.result'),
    },
    {
      icon: <Scale size={22} />,
      sector: t('cases.case2.sector'),
      problem: t('cases.case2.problem'),
      solution: t('cases.case2.solution'),
      result: t('cases.case2.result'),
    },
  ];

  return (
    <section className="cases" id="casos">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('cases.title')} <span className="text-gradient">{t('cases.titleHighlight')}</span>
        </h2>
        <p className="cases__subtitle">{t('cases.subtitle')}</p>

        <div className="cases__grid">
          {cases.map((c, i) => (
            <motion.article
              key={i}
              className="cases__card"
              onMouseMove={handleSpotlight}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="cases__sector">
                <span className="cases__sector-icon">{c.icon}</span>
                <div>
                  <span className="cases__sector-label">{t('cases.sectorLabel')}</span>
                  <h3 className="cases__sector-name">{c.sector}</h3>
                </div>
              </div>

              <div className="cases__field">
                <span className="cases__field-label">{t('cases.problemLabel')}</span>
                <p>{c.problem}</p>
              </div>

              <div className="cases__field">
                <span className="cases__field-label">{t('cases.solutionLabel')}</span>
                <p>{c.solution}</p>
              </div>

              <div className="cases__result">
                <span className="cases__field-label">{t('cases.resultLabel')}</span>
                <p>{c.result}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
