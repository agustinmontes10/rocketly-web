"use client";
import '../styles/components/pricing.scss';
import { useState, memo } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Category = 'web' | 'automation';

interface PricingItem {
  id: string;
  price: number;
}

const WEB_ITEMS: PricingItem[] = [
  { id: 'landing',   price: 400  },
  { id: 'ecommerce', price: 1200 },
  { id: 'admin',     price: 700  },
  { id: 'blog',      price: 200  },
  { id: 'design',    price: 250  },
  { id: 'api',       price: 100  },
  { id: 'seo',       price: 200  },
  { id: 'payment',   price: 200  },
  { id: 'migration', price: 450  },
];

const AUTOMATION_ITEMS: PricingItem[] = [
  { id: 'chatbot_ai',    price: 800 },
  { id: 'chatbot_basic', price: 400 },
  { id: 'whatsapp',      price: 200 },
  { id: 'crm',           price: 350 },
  { id: 'notifications', price: 200 },
  { id: 'n8n',           price: 300 },
  { id: 'scraping',      price: 350 },
  { id: 'reports',       price: 250 },
  { id: 'pipeline',      price: 800 },
  { id: 'billing',       price: 500 },
];

const CONTACT_EMAIL = 'contact.rocketly@gmail.com';

const Pricing = memo(function Pricing() {
  const { t } = useTranslation();
  const [category, setCategory]       = useState<Category>('web');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const items    = category === 'web' ? WEB_ITEMS : AUTOMATION_ITEMS;
  const selected = items.filter(item => selectedIds.has(item.id));
  const total    = selected.reduce((sum, item) => sum + item.price, 0);

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setSelectedIds(new Set());
  };

  const handleCotizar = () => {
    if (selected.length === 0) return;
    const categoryLabel = t(`pricing.${category}`);
    const itemsKey = category === 'web' ? 'web_items' : 'automation_items';
    const lines = selected.map(item => `  • ${t(`pricing.${itemsKey}.${item.id}`)}: $${item.price}`).join('\n');
    const subject = t('pricing.emailSubject', { category: categoryLabel });
    const body = t('pricing.emailBody', { category: categoryLabel, lines, total });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <h2 className="heading heading--lg">
          {t('pricing.title')} <span className="text-gradient">{t('pricing.titleHighlight')}</span>
        </h2>
        <p className="pricing__subtitle">
          {t('pricing.subtitle')}
        </p>

        <div className="pricing__switch">
          <button
            className={`pricing__switch-btn${category === 'web' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('web')}
          >
            {t('pricing.web')}
          </button>
          <button
            className={`pricing__switch-btn${category === 'automation' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('automation')}
          >
            {t('pricing.automation')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="pricing__grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {items.map(item => {
              const isSelected = selectedIds.has(item.id);
              const itemsKey = category === 'web' ? 'web_items' : 'automation_items';
              return (
                <button
                  key={item.id}
                  className={`pricing__item${isSelected ? ' selected' : ''}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className="pricing__item-check">
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="pricing__item-label">{t(`pricing.${itemsKey}.${item.id}`)}</span>
                  <span className="pricing__item-price">${item.price}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <p className="pricing__message">
          {t('pricing.disclaimer')}
        </p>

        <div className="pricing__footer">
          <div className="pricing__total">
            <span className="pricing__total-label">{t('pricing.totalLabel')}</span>
            <motion.span
              key={total}
              className="pricing__total-amount text-gradient"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              ${total} <span className="pricing__total-currency">USD</span>
            </motion.span>
          </div>
          <button
            className="button button--primary pricing__cta"
            onClick={handleCotizar}
            disabled={selected.length === 0}
          >
            {t('pricing.cta')}
          </button>
        </div>
      </div>

      <div className="stars">
        {[...Array(30)].map((_, i) => <div key={i} className="star" />)}
      </div>
    </section>
  );
});

export default Pricing;
