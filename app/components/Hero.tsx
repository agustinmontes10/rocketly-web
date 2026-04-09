"use client"

import { useEffect, useRef, memo } from "react"
import Link from "next/link"
import "../styles/components/hero.scss"
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useTranslation } from 'react-i18next';

// Neural network layers: [x, y] per node
const NN_LAYERS = [
  [{ x: 30, y: 70  }, { x: 30, y: 155 }, { x: 30, y: 240 }, { x: 30, y: 325 }],
  [{ x: 140, y: 113 }, { x: 140, y: 197 }, { x: 140, y: 282 }],
  [{ x: 240, y: 155 }, { x: 240, y: 255 }],
]
const NODE_COLORS = ['#00BE77', '#00BE77', '#00D4E7']

const NeuralNetSVG = () => (
  <svg className="hero__neural" viewBox="0 0 280 400" fill="none">
    <defs>
      <linearGradient id="nnLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00BE77" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#00D4E7" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {NN_LAYERS.slice(0, -1).map((layer, li) =>
      layer.map((from, fi) =>
        NN_LAYERS[li + 1].map((to, ti) => (
          <line key={`${li}-${fi}-${ti}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke="url(#nnLineGrad)" strokeWidth="0.8"
            className="hero__neural-line"
            style={{ animationDelay: `${(li * 4 + fi + ti) * 0.15}s` }}
          />
        ))
      )
    )}
    {NN_LAYERS.map((layer, li) =>
      layer.map((node, ni) => (
        <g key={`node-${li}-${ni}`}>
          <circle cx={node.x} cy={node.y} r={14} fill={NODE_COLORS[li]} opacity={0.08}
            className="hero__neural-pulse" style={{ animationDelay: `${(li * 3 + ni) * 0.3}s` }} />
          <circle cx={node.x} cy={node.y} r={li === NN_LAYERS.length - 1 ? 6 : 4.5}
            fill={NODE_COLORS[li]} opacity={0.85}
            className="hero__neural-node" style={{ animationDelay: `${(li * 3 + ni) * 0.3}s` }} />
        </g>
      ))
    )}
  </svg>
)

// Decorative arc — the single vivid light element, echoes the HowWork curve
const HeroCurve = () => (
  <svg className="hero__curve" viewBox="0 0 1400 700" fill="none" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00BE77" stopOpacity="0.0" />
        <stop offset="30%" stopColor="#00BE77" stopOpacity="1" />
        <stop offset="100%" stopColor="#00D4E7" stopOpacity="1" />
      </linearGradient>
      <filter id="heroCurveGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="18" result="wide" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="tight" />
        <feMerge>
          <feMergeNode in="wide" />
          <feMergeNode in="wide" />
          <feMergeNode in="tight" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Mask: white everywhere = show, dark ellipse in center = reduce behind title */}
      <radialGradient id="centerFade" cx="700" cy="340" r="370" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="black" stopOpacity="0.72" />
        <stop offset="100%" stopColor="black" stopOpacity="0"    />
      </radialGradient>
      <mask id="titleMask" maskUnits="userSpaceOnUse">
        <rect width="1400" height="700" fill="white" />
        <ellipse cx="700" cy="340" rx="410" ry="210" fill="url(#centerFade)" />
      </mask>
    </defs>

    <g mask="url(#titleMask)">
      {/* Soft bloom */}
      <path
        d="M -80 680 C 150 580 400 450 680 340 C 900 250 1100 180 1450 80"
        stroke="url(#heroCurveGrad)"
        strokeWidth="24"
        strokeLinecap="round"
        opacity={0.04}
        filter="url(#heroCurveGlow)"
        className="hero__curve-path"
      />
      {/* Vivid line */}
      <path
        d="M -80 680 C 150 580 400 450 680 340 C 900 250 1100 180 1450 80"
        stroke="url(#heroCurveGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.2}
        filter="url(#heroCurveGlow)"
        className="hero__curve-path"
      />
    </g>
  </svg>
)

const Hero = memo(function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.fonts.ready.then(() => {
        if (!heroRef.current) return;
        const heading = heroRef.current.querySelector("h1");
        const paragraph = heroRef.current.querySelector("p");
        if (!heading || !paragraph) return;
        const lines = Array.from(heading.querySelectorAll('.hero__title-line')) as HTMLElement[];
        const { words: wordsP } = splitText(paragraph);
        animate(
          [...lines, ...wordsP],
          { opacity: [0, 1], y: [20, 0] },
          { type: "spring", duration: 1.6, bounce: 0.2, delay: stagger(0.12) }
        );
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <section className="hero" id="hero">
      {/* Subtle atmospheric glow from top */}
      <div className="hero__glow" />
      {/* The one vivid element: ascending curve */}
      <HeroCurve />
      {/* Perspective grid */}
      <div className="hero__grid" />
      {/* Stars */}
      <div className="stars">
        {[...Array(20)].map((_, i) => <div key={i} className="star" />)}
      </div>
      {/* AI neural net decoration */}
      <NeuralNetSVG />

      <div className="container">
        <div className="hero__content" ref={heroRef}>
          <div>
            <h1 key={i18n.language} className="heading heading--xl">
              <span className="hero__title-line">{t('hero.title')}</span>
              <span className="hero__title-line text-gradient">{t('hero.titleHighlight')}</span>
            </h1>
            <p key={`p-${i18n.language}`}>{t('hero.description')}</p>
          </div>
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
    </section>
  )
});

export default Hero;
