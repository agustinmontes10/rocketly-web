"use client"
import '../styles/components/projects.scss';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getProjectImage = (imageURL: string) => {
    if (isMobile) {
      // Remove trailing slash if exists and add mobile
      return `${imageURL}Mobile`;
    }
    return imageURL;
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="heading heading--lg">{t('projects.title')}</h2>
        {projects.map((project, index) => (
          <div key={index} className="projects__card">
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
              />
            </a>
          </div>
        ))}
      </div>

      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
    </section>
  );
}