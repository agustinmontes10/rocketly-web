"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
// @ts-ignore
import NET from "vanta/dist/vanta.net.min"
import Link from "next/link"
import "../styles/components/hero.scss"
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          // minHeight: 200.00,
          // minWidth: 200.00,
          // scale: 1.00,
          // scaleMobile: 1.00,
          // color: 0x2f5e96,
          // backgroundColor: 0x30318,
          // maxDistance: 10.00,
          // spacing: 19.00
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x9090bb,
          backgroundColor: 0x000000,
          maxDistance: 10.00,
          spacing: 19.00
        })

        // VANTA.NET({
        //   el: "#your-element-selector",
        //   mouseControls: true,
        //   touchControls: true,
        //   gyroControls: false,
        //   minHeight: 200.00,
        //   minWidth: 200.00,
        //   scale: 1.00,
        //   scaleMobile: 1.00,
        //   color: 0x2f5e96,
        //   backgroundColor: 0x30318,
        //   maxDistance: 10.00
        // })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se actualice
    const timer = setTimeout(() => {
      document.fonts.ready.then(() => {
        if (!heroRef.current) return;

        const heading = heroRef.current.querySelector("h1");
        const paragraph = heroRef.current.querySelector("p");

        if (!heading || !paragraph) return;

        // Limpiar animaciones anteriores
        const allElements = heading.querySelectorAll('*');
        allElements.forEach(el => {
          const element = el as HTMLElement;
          element.style.opacity = '';
          element.style.transform = '';
        });

        const { words } = splitText(heading);
        const { words: wordsP } = splitText(paragraph);
        
        // Combine both heading and paragraph words into one array
        const allWords = [...words, ...wordsP];

        animate(
          allWords,
          { opacity: [0, 1], y: [20, 0] },
          {
            type: "spring",
            duration: 1.6,
            bounce: 0.2,
            delay: stagger(0.04),
          }
        );
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [i18n.language]); // Re-ejecutar cuando cambie el idioma

  return (
    <section className="hero" ref={vantaRef} id="hero">
      <div className="hero__overlay">
        <div className="container">
          <div className="hero__content" ref={heroRef}>
            <h1 key={i18n.language} className="heading heading--xl">
              {t('hero.title')} <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>
            <p>
              {t('hero.description')}
            </p>
            <div className="hero__buttons">
              <Link href="#contact" className="button button--primary">
                {t('hero.cta')}
              </Link>
              <Link href="#projects" className="button button--secondary">
                {t('navbar.projects')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
