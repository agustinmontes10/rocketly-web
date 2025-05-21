'use client';

import '../styles/components/services.scss';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Gauge, Lock, Palette } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={32} />,
    title: 'Custom Web Development',
    description: 'Tailored web solutions built with cutting-edge technologies to meet your specific business needs.'
  },
  {
    icon: <Globe size={32} />,
    title: 'E-commerce Solutions',
    description: 'Powerful online stores with seamless payment integration and inventory management.'
  },
  {
    icon: <Smartphone size={32} />,
    title: 'Responsive Design',
    description: 'Mobile-first websites that look and perform beautifully across all devices.'
  },
  {
    icon: <Gauge size={32} />,
    title: 'Performance Optimization',
    description: 'Lightning-fast loading times and optimal user experience through advanced optimization.'
  },
  {
    icon: <Lock size={32} />,
    title: 'Security Solutions',
    description: 'Robust security measures to protect your web applications and user data.'
  },
  {
    icon: <Palette size={32} />,
    title: 'UI/UX Design',
    description: 'Intuitive and engaging user interfaces that deliver exceptional user experiences.'
  }
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="heading heading--lg">Our Services</h2>
        <p className="services__subtitle">Comprehensive web solutions to power your digital success</p>

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
