"use client";
import '../styles/components/pricing.scss';
import { useState, memo } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'web' | 'automation';

interface PricingItem {
  id: string;
  label: string;
  price: number;
}

const WEB_ITEMS: PricingItem[] = [
  { id: 'landing',       label: 'Landing page / sitio institucional',  price: 350  },
  { id: 'ecommerce',     label: 'E-commerce / tienda online',           price: 1500 },
  { id: 'admin',         label: 'Panel de administración',              price: 800  },
  { id: 'blog',          label: 'Blog / CMS personalizado',             price: 500  },
  { id: 'design',        label: 'Diseño UI/UX',                         price: 300  },
  { id: 'api',           label: 'Integración con API externa',          price: 400  },
  { id: 'seo',           label: 'Optimización SEO',                     price: 200  },
  { id: 'auth',          label: 'Autenticación de usuarios',            price: 300  },
  { id: 'db',            label: 'Base de datos y backend',              price: 600  },
  { id: 'forms',         label: 'Formularios de contacto y leads',      price: 100  },
];

const AUTOMATION_ITEMS: PricingItem[] = [
  { id: 'chatbot',       label: 'Chatbot para WhatsApp / Instagram',    price: 400  },
  { id: 'ai',            label: 'Respuestas automáticas con IA',        price: 600  },
  { id: 'crm',           label: 'Integración con CRM',                  price: 350  },
  { id: 'notifications', label: 'Notificaciones automáticas',           price: 200  },
  { id: 'n8n',           label: 'Flujos de trabajo con n8n',            price: 300  },
  { id: 'scraping',      label: 'Extracción y procesamiento de datos',  price: 350  },
  { id: 'reports',       label: 'Reportes automáticos',                 price: 250  },
  { id: 'sheets',        label: 'Integración con Google Sheets',        price: 150  },
  { id: 'bulk',          label: 'Envío masivo de mensajes',             price: 350  },
  { id: 'pipeline',      label: 'Pipeline de ventas automatizado',      price: 500  },
];

// TODO: replace with real WhatsApp number (format: country code + number, no +)
const WHATSAPP_NUMBER = '5491112345678';

const Pricing = memo(function Pricing() {
  const [category, setCategory]     = useState<Category>('web');
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
    const categoryLabel = category === 'web' ? 'Desarrollo Web' : 'Automatizaciones';
    const lines = selected.map(item => `  • ${item.label}: $${item.price}`).join('\n');
    const message = `Hola! Me interesa cotizar los siguientes servicios de *${categoryLabel}*:\n\n${lines}\n\n*Total estimado: $${total} USD*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <h2 className="heading heading--lg">
          Armá tu <span className="text-gradient">proyecto</span>
        </h2>
        <p className="pricing__subtitle">
          Seleccioná los módulos que necesitás y obtené un presupuesto al instante.
        </p>

        <div className="pricing__switch">
          <button
            className={`pricing__switch-btn${category === 'web' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('web')}
          >
            Desarrollo Web
          </button>
          <button
            className={`pricing__switch-btn${category === 'automation' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('automation')}
          >
            Automatizaciones
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
              return (
                <button
                  key={item.id}
                  className={`pricing__item${isSelected ? ' selected' : ''}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className="pricing__item-check">
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="pricing__item-label">{item.label}</span>
                  <span className="pricing__item-price">${item.price}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="pricing__footer">
          <div className="pricing__total">
            <span className="pricing__total-label">Total estimado</span>
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
            Cotizar por WhatsApp
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
