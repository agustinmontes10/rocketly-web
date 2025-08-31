"use client"
import '../styles/components/projects.scss';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

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
      y: 100, 
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 2.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 30,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 40,
        damping: 20
      }
    }
  };

  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className="container">
        <motion.h2 
          className="heading heading--lg"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          Our Latest Projects
        </motion.h2>
        
        <motion.div 
          className="projects__container"
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