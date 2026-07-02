'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/components/problem.scss';
import { motion } from 'framer-motion';
import { Clock, Unplug, Radar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ICONS = [
  <Clock size={20} key="clock" />,
  <Unplug size={20} key="unplug" />,
  <Radar size={20} key="radar" />,
];

const ROTATE_INTERVAL = 2000;

export default function Problem() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const blocks = [
    { title: t('problem.block1.title'), description: t('problem.block1.description') },
    { title: t('problem.block2.title'), description: t('problem.block2.description') },
    { title: t('problem.block3.title'), description: t('problem.block3.description') },
  ];

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % blocks.length);
    }, ROTATE_INTERVAL);
  };

  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              className={`problem__block${active === i ? ' problem__block--active' : ''}`}
              onMouseEnter={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setActive(i);
              }}
              onMouseLeave={startRotation}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <div className="problem__block-head">
                <span className="problem__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="problem__icon">{ICONS[i]}</span>
              </div>
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
