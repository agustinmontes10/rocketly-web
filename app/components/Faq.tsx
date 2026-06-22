'use client';

import '../styles/components/faq.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as unknown as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('faq.title')} <span className="text-gradient">{t('faq.titleHighlight')}</span>
        </h2>

        <div className="faq__list">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
                <button
                  className="faq__question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq__icon"><Plus size={20} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
