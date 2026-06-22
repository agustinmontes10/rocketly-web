'use client';

import dynamic from 'next/dynamic';
import '../styles/components/chatDemo.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

const WhatsAppMock = dynamic(() => import('./WhatsAppMock'), { ssr: false });

export default function ChatDemo() {
  const { t } = useTranslation();

  const bullets = [
    { icon: <Clock size={18} />, text: t('chatDemo.bullet1') },
    { icon: <MessageSquare size={18} />, text: t('chatDemo.bullet2') },
    { icon: <CheckCircle2 size={18} />, text: t('chatDemo.bullet3') },
  ];

  return (
    <section className="chatDemo">
      <div className="container">
        <div className="chatDemo__layout">
          {/* Left: copy */}
          <motion.div
            className="chatDemo__copy"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="chatDemo__label">{t('chatDemo.label')}</span>
            <h2 className="chatDemo__title">
              {t('chatDemo.title')}
              <span className="text-gradient"> {t('chatDemo.titleHighlight')}</span>
            </h2>
            <p className="chatDemo__description">{t('chatDemo.description')}</p>

            <ul className="chatDemo__bullets">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="chatDemo__bullet"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                >
                  <span className="chatDemo__bullet-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: animated mock */}
          <motion.div
            className="chatDemo__mock"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <WhatsAppMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
