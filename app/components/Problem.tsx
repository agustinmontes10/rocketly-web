'use client';

import '../styles/components/problem.scss';
import { motion } from 'framer-motion';
import { Clock, Unplug, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { handleSpotlight } from '../../lib/spotlight';

const ICONS = [
  <Clock size={28} key="clock" />,
  <Unplug size={28} key="unplug" />,
  <EyeOff size={28} key="eyeoff" />,
];

export default function Problem() {
  const { t } = useTranslation();

  const blocks = [
    { title: t('problem.block1.title'), description: t('problem.block1.description') },
    { title: t('problem.block2.title'), description: t('problem.block2.description') },
    { title: t('problem.block3.title'), description: t('problem.block3.description') },
  ];

  return (
    <section className="problem" id="problema">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('problem.title')} <span className="text-gradient">{t('problem.titleHighlight')}</span>
        </h2>

        <div className="problem__grid">
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              className="problem__block"
              onMouseMove={handleSpotlight}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="problem__icon">{ICONS[i]}</div>
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
