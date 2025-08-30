"use client"
import '../styles/components/projects.scss';
import { useState, useEffect } from 'react';

const projects = [
  {
    title: 'Agencia de viajes',
    description: 'Agencia de viajes con diversidad de paquetes y destinos, seccion de contacto y servicios.',
    image: '/assets/agenciaViajes',
    link: 'https://agencia-viajes-gray.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase']
  },
  {
    title: 'Broker de seguros',
    description: 'Broker de seguros con secciones de cotizaciones, ofertas, servicios y contacto',
    image: '/assets/rivoltaSeguros',
    link: 'https://rivolta-seguros.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'Sheets']
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="container projects__container">
        <h2 className="heading heading--lg">Our Latest Projects</h2>
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
                  <button className="button button--primary">Ver proyecto</button>
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