'use client';

import '../styles/components/services.scss';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Gauge, Lock, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getServices = (t: any) => [
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

export default function Services() {
  const { t } = useTranslation();
  const services = getServices(t);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.85
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 25
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  };

  return (
    <section className="section services" id="services">
      <div className="container">
        <motion.h2 
          className="heading heading--lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          {t('services.title')} <span className="text-gradient">{t('services.titleHighlight')}</span>
        </motion.h2>
        
        <motion.p 
          className="services__subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          {t('services.subtitle')}
        </motion.p>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="services__card"
              variants={itemVariants}
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
