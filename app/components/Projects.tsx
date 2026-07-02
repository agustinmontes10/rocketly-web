"use client"
import '../styles/components/projects.scss';
import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Scale, MessageCircle, Globe, Calendar, Scissors } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type FilterType = 'all' | 'web' | 'automation';

interface PlatformCard {
  type: string;
  icon: React.ReactNode;
  platform: string;
  problem: string;
}

interface Project {
  title: string;
  description: string;
  image?: string;
  platformCard?: PlatformCard;
  link: string;
  tags: string[];
  category: FilterType;
  icon: React.ReactNode;
}

const MOBILE_LIMIT  = 3;
const DESKTOP_LIMIT = 4;

const getProjects = (t: any): Project[] => [
  {
    title: t('projects.project1.title'),
    description: t('projects.project1.description'),
    image: '/assets/travelAgency-preview',
    link: 'https://mtturismo.com/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
    category: 'web' as FilterType,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: t('projects.project2.title'),
    description: t('projects.project2.description'),
    image: '/assets/fernandezInmobiliaria-preview',
    link: 'https://fernandezinmobiliaria.vercel.app',
    tags: ['Next.js', 'TypeScript', 'SCSS', 'Supabase', 'n8n'],
    category: 'web' as FilterType,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  /* Oculto temporalmente — Ferrario & Asociados
  {
    title: t('projects.project4.title'),
    description: t('projects.project4.description'),
    image: '/assets/ferrarioAsociados-preview',
    link: '',
    tags: ['Meta API', 'Chatwoot', 'n8n'],
    category: 'automation' as FilterType,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 7v4"/>
        <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  */
  {
    title: t('projects.project3.title'),
    description: t('projects.project3.description'),
    image: '/assets/rivoltaSeguros-preview',
    link: 'https://rivolta-seguros.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'Sheets'],
    category: 'web' as FilterType,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: t('cases.case1.sector'),
    description: t('cases.case1.solution'),
    platformCard: {
      type: t('projects.typeAgent'),
      icon: <MessageCircle size={26} />,
      platform: t('projects.platformWhatsapp'),
      problem: t('cases.case1.problem'),
    },
    link: '',
    tags: ['WhatsApp', 'Chatwoot', 'n8n'],
    category: 'automation' as FilterType,
    icon: <Building2 size={18} />,
  },
  {
    title: t('cases.case2.sector'),
    description: t('cases.case2.solution'),
    platformCard: {
      type: t('projects.typeChatbot'),
      icon: <Globe size={26} />,
      platform: t('projects.platformWebsite'),
      problem: t('cases.case2.problem'),
    },
    link: '',
    tags: ['IA', 'RAG', 'Website'],
    category: 'automation' as FilterType,
    icon: <Scale size={18} />,
  },
  {
    title: t('projects.project5.title'),
    description: t('projects.project5.description'),
    image: '/assets/aesthetic-preview',
    link: 'https://aestheticapp.com.ar',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Supabase'],
    category: 'web' as FilterType,
    icon: <Calendar size={18} />,
  },
  {
    title: t('projects.project5.title'),
    description: t('projects.aestheticAgent.description'),
    platformCard: {
      type: t('projects.typeAgent'),
      icon: <MessageCircle size={26} />,
      platform: t('projects.platformWhatsapp'),
      problem: t('projects.aestheticAgent.problem'),
    },
    link: '',
    tags: ['WhatsApp', 'n8n', 'GPT-4o mini'],
    category: 'automation' as FilterType,
    icon: <Scissors size={18} />,
  },

];

const Projects = memo(function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const allProjects = getProjects(t);
  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  const limit    = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT;
  const hasMore  = filtered.length > limit;
  const projects = showAll ? filtered : filtered.slice(0, limit);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      const index = Math.min(
        Math.floor(progress * projects.length),
        projects.length - 1
      );
      setActiveIndex(Math.max(0, index));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, projects.length]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveIndex(0);
    setShowAll(false);
  };

  const scrollToProject = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;
    const targetScroll = window.scrollY + rect.top + (index / projects.length) * scrollableHeight + 1;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const renderPreview = (project: Project, className: string, eager = false) => {
    if (project.platformCard) {
      return (
        <div className={`projects__platform-card ${className}`}>
          <h3 className="projects__platform-card__type">{project.platformCard.type}</h3>
          <div className="projects__platform-card__where">
            <div className="projects__platform-card__badge">{project.platformCard.icon}</div>
            <div className="projects__platform-card__where-text">
              <span className="projects__platform-card__where-label">{t('projects.platformLabel')}</span>
              <span className="projects__platform-card__platform">{project.platformCard.platform}</span>
            </div>
          </div>
          <div className="projects__platform-card__problem">
            <span className="projects__platform-card__problem-label">{t('projects.problemLabel')}</span>
            <p>{project.platformCard.problem}</p>
          </div>
        </div>
      );
    }
    return (
      <img
        src={`${project.image}.png`}
        alt={project.title}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
      />
    );
  };


  if (isMobile) {
    return (
      <section className="projects projects--mobile" id="projects">
        <div className="container">
          <h2 className="heading heading--lg">
            {t('projects.title')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
          </h2>
          <div className="projects__mobile-list">
            {projects.map((project, index) => (
              <div key={index} className="projects__mobile-card">
                {renderPreview(project, 'projects__mobile-image', index === 0)}
                <div className="projects__mobile-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="projects__tags">
                    {project.tags.map((tag, i) => <span key={i}>{tag}</span>)}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <button className="button button--primary">{t('projects.viewProject')}</button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {hasMore && !showAll && (
            <div className="projects__view-all">
              <button className="button button--secondary" onClick={() => setShowAll(true)}>
                {t('projects.viewAll')}
              </button>
            </div>
          )}
        </div>
        <div className="stars">
          {[...Array(30)].map((_, i) => <div key={i} className="star" />)}
        </div>
      </section>
    );
  }

  return (
    <section
      className="projects"
      id="projects"
      ref={sectionRef}
      style={{ height: `${projects.length * 100 + 50}vh` }}
    >
      <div className="projects__sticky">
        <h2 className="heading heading--lg">
          {t('projects.title')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
        </h2>

        <div className="projects__filters">
          {(['all', 'web', 'automation'] as FilterType[]).map(filter => (
            <button
              key={filter}
              className={`projects__filter-btn${activeFilter === filter ? ' active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {t(`projects.filter.${filter}`)}
            </button>
          ))}
        </div>

        <div className="projects__layout">
          {/* Left indicators */}
          <div className="projects__indicators">
            {projects.map((project, i) => (
              <button
                key={i}
                className={`projects__indicator${i === activeIndex ? ' active' : ''}`}
                onClick={() => scrollToProject(i)}
                aria-label={`Go to project ${i + 1}`}
              >
                {project.icon}
              </button>
            ))}
          </div>

          {/* Left content */}
          <div className="projects__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="projects__project-title">{projects[activeIndex].title}</h2>
                <p className="projects__project-description">{projects[activeIndex].description}</p>
                <div className="projects__tags">
                  {projects[activeIndex].tags.map((tag, i) => <span key={i}>{tag}</span>)}
                </div>
                {projects[activeIndex].link && (
                  <a href={projects[activeIndex].link} target="_blank" rel="noopener noreferrer">
                    <button className="button button--primary">{t('projects.viewProject')}</button>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="projects__progress">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`projects__dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => scrollToProject(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>

            {hasMore && !showAll && (
              <button className="button button--secondary projects__view-all-btn" onClick={() => setShowAll(true)}>
                {t('projects.viewAll')}
              </button>
            )}
          </div>

          {/* Right image */}
          <div className="projects__preview">
            <AnimatePresence mode="wait">
              {(() => {
                const active = projects[activeIndex];
                const PreviewWrapper = active.link ? motion.a : motion.div;
                const linkProps = active.link
                  ? { href: active.link, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <PreviewWrapper
                    key={activeIndex}
                    {...linkProps}
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="projects__preview-link"
                  >
                    {renderPreview(active, 'projects__preview-image')}
                  </PreviewWrapper>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
        <div className="stars">
          {[...Array(30)].map((_, i) => <div key={i} className="star" />)}
        </div>
      </div>
    </section>
  );
});

export default Projects;
