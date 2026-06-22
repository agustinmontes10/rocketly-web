'use client';

import '../styles/components/metrics.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Metrics() {
  const { t } = useTranslation();

  const items = [
    { value: t('metrics.item1.value'), label: t('metrics.item1.label') },
    { value: t('metrics.item2.value'), label: t('metrics.item2.label') },
    { value: t('metrics.item3.value'), label: t('metrics.item3.label') },
    { value: t('metrics.item4.value'), label: t('metrics.item4.label') },
  ];

  return (
    <section className="metrics" aria-label="Datos clave">
      <div className="container">
        <div className="metrics__grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="metrics__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <span className="metrics__value text-gradient">{item.value}</span>
              <span className="metrics__label">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
