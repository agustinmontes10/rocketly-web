'use client';

import { useState, memo } from 'react';
import '../styles/components/services.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Workflow, MessageSquare, Bot, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ICONS = [ClipboardList, Workflow, MessageSquare, Bot, Globe];
const KEYS = ['service4', 'service1', 'service2', 'service3', 'service5'];

const Services = memo(function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const services = KEYS.map((key) => ({
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
  }));

  const ActiveIcon = ICONS[active];

  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="heading heading--lg services__heading">
          {t('services.title')} <span className="text-gradient">{t('services.titleHighlight')}</span>
        </h2>

        <div className="services__layout">
          <ul className="services__list">
            {services.map((service, i) => (
              <li
                key={i}
                className={`services__item${active === i ? ' services__item--active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="services__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="services__item-title">{service.title}</span>
              </li>
            ))}
          </ul>

          <div className="services__preview">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="services__badge"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ActiveIcon size={28} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                className="services__description"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {services[active].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Services;
