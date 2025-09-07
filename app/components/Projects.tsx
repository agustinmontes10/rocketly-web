"use client"
import '../styles/components/projects.scss';
import { useState, useEffect, memo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const getProjects = (t: any) => [
  {
    title: t('projects.project1.title'),
    description: t('projects.project1.description'),
    image: '/assets/agenciaViajes',
    link: 'https://agencia-viajes-gray.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase']
  },
  {
    title: t('projects.project2.title'),
    description: t('projects.project2.description'),
    image: '/assets/rivoltaSeguros',
    link: 'https://rivolta-seguros.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'Sheets']
  },
];

const Projects = memo(function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  const { t } = useTranslation();
  const projects = getProjects(t);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const getProjectImage = (imageURL: string) => {
    if (isMobile) {
      // Remove trailing slash if exists and add mobile
      return `${imageURL}Mobile`;
    }
    return imageURL;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 50 : 100, 
      scale: isMobile ? 0.95 : 0.9,
      rotateX: isMobile ? 0 : -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: isMobile ? 1.2 : 2.8,
        ease: isMobile ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
        type: isMobile ? "tween" : "spring",
        stiffness: isMobile ? 100 : 30,
        damping: isMobile ? 20 : 15
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 40 : 80, 
      scale: isMobile ? 0.9 : 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 1.0 : 2.5,
        ease: isMobile ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
        type: isMobile ? "tween" : "spring",
        stiffness: isMobile ? 100 : 40,
        damping: isMobile ? 25 : 20
      }
    }
  };

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <motion.h2 
          className="heading heading--lg"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          {t('projects.title')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
        </motion.h2>
        
        <motion.div 
          className="projects__container __cards__container"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="projects__card"
              variants={itemVariants}
            >
              <div className="projects__card-content">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="projects__card-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
                <div className="projects__card-buttons">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <button className="button button--primary">{t('projects.viewProject')}</button>
                  </a>
                </div>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${getProjectImage(project.image)}.png`}
                  alt={project.title}
                  className="projects__card-image"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </a>
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
});

export default Projects;