'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Smartphone, Tablet, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from '../styles/components/ProjectSlider.module.scss'

interface Project {
  id: number
  title: string
  category: string
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
  const [isChanging, setIsChanging] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right')

  const nextProject = () => {
    setIsChanging(true)
    setAnimationDirection('right')
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
      setIsChanging(false)
    }, 300)
  }

  const prevProject = () => {
    setIsChanging(true)
    setAnimationDirection('left')
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
      setIsChanging(false)
    }, 300)
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
            <span>Templates</span> Collection
          </h2>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <div className={styles.deviceSelector}>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'mobile' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('mobile')}
              >
                <Smartphone className={styles.deviceIcon} />
                Mobile
              </button>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'tablet' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('tablet')}
              >
                <Tablet className={styles.deviceIcon} />
                Tablet
              </button>
              <button
                className={`${styles.deviceBtn} ${currentDevice === 'desktop' ? styles.active : ''}`}
                onClick={() => setCurrentDevice('desktop')}
              >
                <Monitor className={styles.deviceIcon} />
                Desktop
              </button>
            </div>

            <div className={styles.keyFeatures}>
              <h4>Key Features:</h4>
              <ul>
                <li>Fully Responsive Design</li>
                <li>Modern UI/UX</li>
                <li>Optimized Performance</li>
                <li>SEO Ready</li>
              </ul>
            </div>
          </div>

          <div className={styles.displayArea}>
            <div className={`${styles.mockupWrapper} ${isChanging ? styles.changing : ''} ${!isChanging ? (animationDirection === 'right' ? styles.slideInRight : styles.slideInLeft) : ''}`}>
              <div className={`${styles.deviceFrame} ${styles[currentDevice]}`}>
                {currentDevice === 'mobile' && (
                  <div className={styles.mobileFrame}>
                    <div className={styles.screen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholder}>
                          <Smartphone className={styles.placeholderIcon} />
                          <p>{project.title}</p>
                          <span>Mobile View</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.mobile}
                          alt={`${project.title} mobile`}
                          fill
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                  </div>
                )}

                {currentDevice === 'tablet' && (
                  <div className={styles.tabletFrame}>
                    <div className={styles.screen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholder}>
                          <Tablet className={styles.placeholderIcon} />
                          <p>{project.title}</p>
                          <span>Tablet View</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.tablet}
                          alt={`${project.title} tablet`}
                          fill
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                  </div>
                )}

                {currentDevice === 'desktop' && (
                  <div className={styles.desktopFrame}>
                    <div className={styles.titleBar}>
                      <div className={styles.buttons}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className={styles.screen}>
                      {imageErrors[imageKey] ? (
                        <div className={styles.placeholder}>
                          <Monitor className={styles.placeholderIcon} />
                          <p>{project.title}</p>
                          <span>Desktop View</span>
                        </div>
                      ) : (
                        <Image
                          src={project.devices.desktop}
                          alt={`${project.title} desktop`}
                          fill
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
            <ChevronLeft />
          </button>
          
          <div className={styles.projectInfo}>
            <h3>{project.title}</h3>
            <span className={styles.category} style={{ color: project.color }}>
              {project.category}
            </span>
          </div>
          
          <button className={styles.navBtn} onClick={nextProject}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}