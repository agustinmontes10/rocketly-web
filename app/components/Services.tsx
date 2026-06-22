'use client';

import '../styles/components/services.scss';
import { motion } from 'framer-motion';
import { Workflow, MessageSquare, Bot, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { handleSpotlight } from '../../lib/spotlight';

const getServices = (t: any) => [
  {
    icon: <Workflow size={28} />,
    title: t('services.service1.title'),
    description: t('services.service1.description'),
  },
  {
    icon: <MessageSquare size={28} />,
    title: t('services.service2.title'),
    description: t('services.service2.description'),
  },
  {
    icon: <Bot size={28} />,
    title: t('services.service3.title'),
    description: t('services.service3.description'),
  },
  {
    icon: <ClipboardList size={28} />,
    title: t('services.service4.title'),
    description: t('services.service4.description'),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Services = memo(function Services() {
  const { t } = useTranslation();
  const services = getServices(t);

  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('services.title')} <span className="text-gradient">{t('services.titleHighlight')}</span>
        </h2>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const wide = index === 0 || index === 3;
            return (
              <motion.div
                key={index}
                className={`services__card${wide ? ' services__card--wide' : ''}`}
                onMouseMove={handleSpotlight}
                whileHover={{ y: -4 }}
                variants={itemVariants}
              >
                <div className="services__card-icon">{service.icon}</div>
                <div className="services__card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

export default Services;
