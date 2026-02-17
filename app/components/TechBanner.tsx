'use client';

import '../styles/components/techBanner.scss';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiDocker, 
  SiPostgresql, 
  SiGit, 
  SiFigma,
  SiVercel,
  SiFirebase,
  SiJavascript,
  SiSass,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiLinux,
  SiNginx,
  SiKubernetes,
  SiPrisma,
  SiSupabase,
  SiN8N
} from 'react-icons/si';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const technologies: TechItem[] = [
  { name: 'React', icon: <SiReact size={32} />, color: '#61DAFB' },
  { name: 'TypeScript', icon: <SiTypescript size={32} />, color: '#3178C6' },
  { name: 'Next.js', icon: <SiNextdotjs size={32} />, color: '#FFFFFF' },
  { name: 'Node.js', icon: <SiNodedotjs size={32} />, color: '#339933' },
  { name: 'n8n', icon: <SiN8N size={32} />, color: '#EA4B71' },
  { name: 'Tailwind', icon: <SiTailwindcss size={32} />, color: '#06B6D4' },
  { name: 'Docker', icon: <SiDocker size={32} />, color: '#2496ED' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={32} />, color: '#4169E1' },
  { name: 'Git', icon: <SiGit size={32} />, color: '#F05032' },
  { name: 'Figma', icon: <SiFigma size={32} />, color: '#F24E1E' },
  { name: 'Vercel', icon: <SiVercel size={32} />, color: '#FFFFFF' },
  { name: 'Firebase', icon: <SiFirebase size={32} />, color: '#FFCA28' },
  { name: 'JavaScript', icon: <SiJavascript size={32} />, color: '#F7DF1E' },
  { name: 'Sass', icon: <SiSass size={32} />, color: '#CC6699' },
  { name: 'Webpack', icon: <SiWebpack size={32} />, color: '#8DD6F9' },
  { name: 'Vite', icon: <SiVite size={32} />, color: '#646CFF' },
  { name: 'Jest', icon: <SiJest size={32} />, color: '#C21325' },
  { name: 'Cypress', icon: <SiCypress size={32} />, color: '#69D3A7' },
  { name: 'Linux', icon: <SiLinux size={32} />, color: '#FCC624' },
  { name: 'Nginx', icon: <SiNginx size={32} />, color: '#009639' },
  { name: 'Kubernetes', icon: <SiKubernetes size={32} />, color: '#326CE5' },
  { name: 'Prisma', icon: <SiPrisma size={32} />, color: '#5A67D8' },
  { name: 'Supabase', icon: <SiSupabase size={32} />, color: '#3ECF8E' },
];

const TechBanner = memo(function TechBanner() {
  const { t } = useTranslation();

  // Double the array for seamless infinite scroll
  const duplicatedTechs = useMemo(() => [...technologies, ...technologies], []);
  
  // Split into two rows for visual variety
  const row1 = useMemo(() => duplicatedTechs.slice(0, duplicatedTechs.length / 2), [duplicatedTechs]);
  const row2 = useMemo(() => duplicatedTechs.slice(duplicatedTechs.length / 2), [duplicatedTechs]);

  return (
    <section className="tech-banner">
      <motion.div 
        className="tech-banner__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="tech-banner__title">
          {t('techBanner.title', 'Technologies We Master')}
        </h2>
        <p className="tech-banner__subtitle">
          {t('techBanner.subtitle', 'Building the future with cutting-edge tools')}
        </p>
      </motion.div>

      <div className="tech-banner__container">
        {/* Row 1 - scrolls left */}
        <div className="tech-banner__row tech-banner__row--left">
          <div className="tech-banner__track">
            {row1.map((tech, index) => (
              <div
                key={`row1-${tech.name}-${index}`}
                className="tech-banner__item"
                style={{ '--tech-color': tech.color } as React.CSSProperties}
              >
                <div className="tech-banner__icon">
                  {tech.icon}
                </div>
                <span className="tech-banner__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div className="tech-banner__row tech-banner__row--right">
          <div className="tech-banner__track">
            {row2.map((tech, index) => (
              <div
                key={`row2-${tech.name}-${index}`}
                className="tech-banner__item"
                style={{ '--tech-color': tech.color } as React.CSSProperties}
              >
                <div className="tech-banner__icon">
                  {tech.icon}
                </div>
                <span className="tech-banner__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default TechBanner;
