'use client';

import '../styles/components/services.scss';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Gauge, Lock, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Code2 size={32} />,
      title: t('services.service1.title'),
      description: t('services.service1.description')
    },
    {
      icon: <Globe size={32} />,
      title: t('services.service2.title'),
      description: t('services.service2.description')
    },
    {
      icon: <Smartphone size={32} />,
      title: t('services.service3.title'),
      description: t('services.service3.description')
    },
    {
      icon: <Gauge size={32} />,
      title: t('services.service4.title'),
      description: t('services.service4.description')
    },
    {
      icon: <Lock size={32} />,
      title: t('services.service5.title'),
      description: t('services.service5.description')
    }
  ];
  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="heading heading--lg">{t('services.title')}</h2>
        <p className="services__subtitle">{t('services.description')}</p>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="services__card"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="services__card-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
    </section>
  );
}
