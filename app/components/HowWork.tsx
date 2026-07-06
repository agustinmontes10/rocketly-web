'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import '@/app/styles/components/howWork.scss'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '../../lib/site'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const CURVE_PATH = 'M 120 340 C 320 330 420 280 600 215 S 900 95 1080 60'
const AREA_PATH = 'M 120 340 C 320 330 420 280 600 215 S 900 95 1080 60 L 1080 400 L 120 400 Z'

const DOT_POSITIONS = [
  { x: 120, y: 340 },
  { x: 600, y: 215 },
  { x: 1080, y: 60 },
]

export default function HowWork() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationData, setAnimationData] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  const steps = [
    { number: '01', title: t('howWork.step1.title'), description: t('howWork.step1.description') },
    { number: '02', title: t('howWork.step2.title'), description: t('howWork.step2.description') },
    { number: '03', title: t('howWork.step3.title'), description: t('howWork.step3.description') },
  ]

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetch('/assets/animationRocket2.json')
      .then(r => r.json())
      .then(setAnimationData)
  }, [])

  // containerRef siempre en el mismo elemento — useScroll nunca pierde el tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Desktop: spring-smoothed ───────────────────────────────────
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  // El path empieza en 0.08 (pequeño tramo ya visible al entrar)
  const pathLength = useTransform(smooth, [0, 0.9], [0.08, 1])
  // Dot 1 y step 1 visibles desde el inicio (son el punto de partida)
  const dot1Opacity = useTransform(smooth, [0, 0.05], [0.7, 1])
  const dot2Opacity = useTransform(smooth, [0.38, 0.50], [0, 1])
  const dot3Opacity = useTransform(smooth, [0.72, 0.84], [0, 1])
  const dotOpacities = [dot1Opacity, dot2Opacity, dot3Opacity]
  const line1Opacity = useTransform(smooth, [0, 0.05], [0.5, 1])
  const line2Opacity = useTransform(smooth, [0.39, 0.51], [0, 1])
  const line3Opacity = useTransform(smooth, [0.73, 0.85], [0, 1])
  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity]
  const step1Opacity = useTransform(smooth, [0, 0.08], [0.6, 1])
  const step2Opacity = useTransform(smooth, [0.39, 0.55], [0, 1])
  const step3Opacity = useTransform(smooth, [0.73, 0.88], [0, 1])
  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity]
  const step1Y = useTransform(smooth, [0, 0.08], [8, 0])
  const step2Y = useTransform(smooth, [0.39, 0.55], [24, 0])
  const step3Y = useTransform(smooth, [0.73, 0.88], [24, 0])
  const stepYs = [step1Y, step2Y, step3Y]
  const rocketOpacity = useTransform(smooth, [0.73, 0.86], [0, 1])

  return (
    // Un único elemento root — containerRef nunca se desmonta → useScroll siempre trackea
    <div
      className={`howWork${isMobile ? ' howWork--mobile' : ''}`}
      id="howWork"
      ref={containerRef}
    >
      <div className="howWork__sticky">
        <div className="howWork__header">
          <h2 className="heading heading--lg">
            {t('howWork.title')}{' '}
            <span className="text-gradient">{t('howWork.titleHighlight')}</span>
          </h2>
        </div>

        {isMobile ? (
          /* ── Mobile content: lista simple, sin SVG ──────────────── */
          <div className="howWork__mobile-steps">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="howWork__mobile-step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              >
                <span className="howWork__mobile-step-number">{step.number}</span>
                <div className="howWork__mobile-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── Desktop content ──────────────────────────────────── */
          <div className="howWork__track">
            <div className="howWork__svg-wrapper">
              <svg viewBox="0 0 1200 400" className="howWork__svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00BE77" />
                    <stop offset="100%" stopColor="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00BE77" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="#00BE77" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path d={AREA_PATH} fill="url(#areaGradient)" opacity="0.6" />
                <path d={CURVE_PATH} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <motion.path d={CURVE_PATH} fill="none" stroke="url(#curveGradient)" strokeWidth="10" strokeLinecap="round" opacity={0.12} style={{ pathLength }} />
                <motion.path d={CURVE_PATH} fill="none" stroke="url(#curveGradient)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength }} />

                {DOT_POSITIONS.map((pos, i) => (
                  <motion.line key={`vline-${i}`} x1={pos.x} y1={pos.y} x2={pos.x} y2={390}
                    stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,4"
                    style={{ opacity: lineOpacities[i] }} />
                ))}
                {DOT_POSITIONS.map((pos, i) => {
                  const isLast = i === DOT_POSITIONS.length - 1
                  return (
                    <motion.g key={`dot-${i}`} style={{ opacity: dotOpacities[i] }}>
                      <circle cx={pos.x} cy={pos.y} r={22} fill={isLast ? '#00D4E7' : '#00BE77'} opacity={0.15} />
                      <circle cx={pos.x} cy={pos.y} r={isLast ? 8 : 6} fill={isLast ? '#00D4E7' : '#00BE77'} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    </motion.g>
                  )
                })}
              </svg>

              {animationData && (
                <motion.div className="howWork__rocket" style={{ opacity: rocketOpacity }}>
                  <Lottie animationData={animationData} loop />
                </motion.div>
              )}
            </div>

            <div className="howWork__labels">
              {steps.map((step, i) => (
                <motion.div key={i} className="howWork__step" style={{ opacity: stepOpacities[i], y: stepYs[i] }}>
                  <span className="howWork__step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="howWork__cta">
          <a
            href={whatsappLink('Hola, me gustaría saber qué automatizarían en mi empresa.')}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            {t('howWork.cta')}
          </a>
        </div>
      </div>
    </div>
  )
}
