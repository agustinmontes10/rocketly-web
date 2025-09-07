'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/components/ProjectSlider.module.scss'

interface Project {
  id: number
  title: string
  category: string
  description: string
  devices: {
    mobile: string
    tablet: string
    desktop: string
  }
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Template",
    category: "E-Commerce",
    description: "Modern and responsive online store template with advanced shopping features and seamless payment integration",
    devices: {
      mobile: "/projects/ecommerce-mobile.png",
      tablet: "/projects/ecommerce-tablet.png",
      desktop: "/projects/ecommerce-desktop.png"
    },
    color: "#00D4E7"
  },
  {
    id: 2,
    title: "Portfolio Template",
    category: "Portfolio",
    description: "Creative portfolio template perfect for showcasing your work, skills, and professional achievements",
    devices: {
      mobile: "/projects/portfolio-mobile.png",
      tablet: "/projects/portfolio-tablet.png",
      desktop: "/projects/portfolio-desktop.png"
    },
    color: "#00BE77"
  },
  {
    id: 3,
    title: "Travel Agency Template",
    category: "Travel",
    description: "Beautiful travel website template with booking system, destination showcase, and travel planning tools",
    devices: {
      mobile: "/projects/travel-mobile.png",
      tablet: "/projects/travel-tablet.png",
      desktop: "/projects/travel-desktop.png"
    },
    color: "#58a6ff"
  }
]

export default function ProjectSlider() {
  const [currentProject, setCurrentProject] = useState(0)
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }))
  }

  const project = projects[currentProject]
  const imageKey = `${project.id}-${currentDevice}`

  return (
    <section className={styles.projectSlider}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Our <span>Project Templates</span>
          </h2>
          <p className={styles.subtitle}>
            Explore our collection of modern, responsive templates ready for deployment
          </p>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.projectInfo}>
            <div className={styles.categoryBadge} style={{ backgroundColor: project.color }}>
              {project.category}
            </div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            
            <div className={styles.deviceSelector}>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'mobile' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('mobile')}
              >
                📱 Mobile
              </button>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'tablet' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('tablet')}
              >
                📟 Tablet
              </button>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'desktop' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('desktop')}
              >
                🖥️ Desktop
              </button>
            </div>

            <div className={styles.projectFeatures}>
              <h4>Key Features:</h4>
              <ul>
                <li>Fully Responsive Design</li>
                <li>Modern UI/UX</li>
                <li>Optimized Performance</li>
                <li>SEO Ready</li>
              </ul>
            </div>
          </div>

          <div className={styles.deviceMockup}>
            <div className={`${styles.mockupContainer} ${styles[currentDevice]}`}>
              <div className={styles.mockupFrame}>
                {currentDevice === 'mobile' && (
                  <div className={styles.mobileFrame}>
                    <div className={styles.mobileNotch}></div>
                    <div className={styles.mockupScreen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholderText}>
                          <div className={styles.placeholderIcon}>📱</div>
                          <h4>{project.title}</h4>
                          <p>Mobile View</p>
                          <span>Coming Soon</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.mobile}
                          alt={`${project.title} mobile view`}
                          fill
                          className={styles.mockupImage}
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                    <div className={styles.mobileHomeButton}></div>
                  </div>
                )}

                {currentDevice === 'tablet' && (
                  <div className={styles.tabletFrame}>
                    <div className={styles.mockupScreen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholderText}>
                          <div className={styles.placeholderIcon}>📟</div>
                          <h4>{project.title}</h4>
                          <p>Tablet View</p>
                          <span>Coming Soon</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.tablet}
                          alt={`${project.title} tablet view`}
                          fill
                          className={styles.mockupImage}
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                  </div>
                )}

                {currentDevice === 'desktop' && (
                  <div className={styles.desktopFrame}>
                    <div className={styles.desktopBar}>
                      <div className={styles.desktopButtons}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className={styles.addressBar}>
                        <span>🔒 {project.category.toLowerCase()}-template.com</span>
                      </div>
                    </div>
                    <div className={styles.mockupScreen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholderText}>
                          <div className={styles.placeholderIcon}>🖥️</div>
                          <h4>{project.title}</h4>
                          <p>Desktop View</p>
                          <span>Coming Soon</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.desktop}
                          alt={`${project.title} desktop view`}
                          fill
                          className={styles.mockupImage}
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navigation}>
          <button className={styles.navBtn} onClick={prevProject}>
            ← Previous
          </button>
          
          <div className={styles.indicators}>
            {projects.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentProject ? styles.active : ''}`}
                onClick={() => setCurrentProject(index)}
                style={{ backgroundColor: index === currentProject ? project.color : undefined }}
              />
            ))}
          </div>
          
          <button className={styles.navBtn} onClick={nextProject}>
            Next →
          </button>
        </div>

        <div className={styles.projectCounter}>
          <span>{String(currentProject + 1).padStart(2, '0')}</span>
          <div className={styles.divider}></div>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
