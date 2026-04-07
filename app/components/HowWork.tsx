'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import '@/app/styles/components/howWork.scss'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const CURVE_PATH = 'M 80 350 C 250 350 420 340 600 280 S 1000 40 1140 30'
const AREA_PATH = 'M 80 350 C 250 350 420 340 600 280 S 1000 40 1140 30 L 1140 400 L 80 400 Z'

const DOT_POSITIONS = [
  { x: 80, y: 350 },
  { x: 420, y: 330 },
  { x: 780, y: 195 },
  { x: 1140, y: 30 },
]

export default function HowWork() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationData, setAnimationData] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  const steps = [
    { title: t('howWork.step1.title'), description: t('howWork.step1.description') },
    { title: t('howWork.step2.title'), description: t('howWork.step2.description') },
    { title: t('howWork.step3.title'), description: t('howWork.step3.description') },
    { title: t('howWork.step4.title'), description: t('howWork.step4.description') },
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

  const pathLength = useTransform(smooth, [0.05, 0.88], [0, 1])
  const dot1Opacity = useTransform(smooth, [0.04, 0.14], [0, 1])
  const dot2Opacity = useTransform(smooth, [0.28, 0.38], [0, 1])
  const dot3Opacity = useTransform(smooth, [0.52, 0.62], [0, 1])
  const dot4Opacity = useTransform(smooth, [0.75, 0.85], [0, 1])
  const dotOpacities = [dot1Opacity, dot2Opacity, dot3Opacity, dot4Opacity]
  const line1Opacity = useTransform(smooth, [0.05, 0.16], [0, 1])
  const line2Opacity = useTransform(smooth, [0.29, 0.40], [0, 1])
  const line3Opacity = useTransform(smooth, [0.53, 0.63], [0, 1])
  const line4Opacity = useTransform(smooth, [0.76, 0.86], [0, 1])
  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity, line4Opacity]
  const step1Opacity = useTransform(smooth, [0.05, 0.20], [0, 1])
  const step2Opacity = useTransform(smooth, [0.29, 0.43], [0, 1])
  const step3Opacity = useTransform(smooth, [0.53, 0.66], [0, 1])
  const step4Opacity = useTransform(smooth, [0.76, 0.89], [0, 1])
  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity, step4Opacity]
  const step1Y = useTransform(smooth, [0.05, 0.20], [24, 0])
  const step2Y = useTransform(smooth, [0.29, 0.43], [24, 0])
  const step3Y = useTransform(smooth, [0.53, 0.66], [24, 0])
  const step4Y = useTransform(smooth, [0.76, 0.89], [24, 0])
  const stepYs = [step1Y, step2Y, step3Y, step4Y]
  const rocketOpacity = useTransform(smooth, [0.76, 0.89], [0, 1])

  // ── Mobile timeline animation ───────────────
  const mobilePathLength = useTransform(scrollYProgress, [0.05, 0.9], [0, 1])

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
          /* ── Mobile content ───────────────────────────────────── */
          <div className="howWork__mobile-layout">

            {/* SVG timeline centrada */}
            <div className="howWork__mobile-svg-wrapper">
              <svg className="howWork__mobile-svg" width="100" height="462" viewBox="0 0 100 462" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_259_41)">
                  <path d="M49 -38.5941C93.8 23.335 93.8 65.9113 49 127.841C93.8 189.77 93.8 232.346 49 294.275C93.8 356.204 93.8 384.589 49 446.518" stroke="white" stroke-opacity="0.06" stroke-width="2" />
                  <path opacity="0.12" d="M49 -38.5941C93.8 23.335 93.8 65.9113 49 127.841C93.8 189.77 93.8 232.346 49 294.275C93.8 356.204 93.8 384.589 49 446.518" stroke="url(#paint0_linear_259_41)" stroke-width="12" stroke-linecap="round" stroke-dasharray="1 1" />
                  <motion.path
                    d="M49 -38.5941C93.8 23.335 93.8 65.9113 49 127.841C93.8 189.77 93.8 232.346 49 294.275C93.8 356.204 93.8 384.589 49 446.518"
                    stroke="url(#paint1_linear_259_41)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: mobilePathLength }}
                  />
                </g>
                <g clip-path="url(#clip1_259_41)">
                  <path d="M50 8.34998C5.2 61.75 5.2 98.4625 50 151.862C5.2 205.262 5.2 241.975 50 295.375C5.2 348.775 5.2 373.25 50 426.65" stroke="white" stroke-opacity="0.06" stroke-width="2" />
                  <path opacity="0.12" d="M50 8.34998C5.2 61.75 5.2 98.4625 50 151.862C5.2 205.262 5.2 241.975 50 295.375C5.2 348.775 5.2 373.25 50 426.65" stroke="url(#paint2_linear_259_41)" stroke-width="12" stroke-linecap="round" stroke-dasharray="1 1" />
                  <motion.path
                    d="M50 8.34998C5.2 61.75 5.2 98.4625 50 151.862C5.2 205.262 5.2 241.975 50 295.375C5.2 348.775 5.2 373.25 50 426.65"
                    stroke="url(#paint3_linear_259_41)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: mobilePathLength }}
                  />
                </g>
                <g clip-path="url(#clip2_259_41)">
                  <path d="M50 8.34998C94.8 61.75 94.8 98.4625 50 151.862C94.8 205.262 94.8 241.975 50 295.375C94.8 348.775 94.8 373.25 50 426.65" stroke="white" stroke-opacity="0.06" stroke-width="2" />
                  <path opacity="0.12" d="M50 8.34998C94.8 61.75 94.8 98.4625 50 151.862C94.8 205.262 94.8 241.975 50 295.375C94.8 348.775 94.8 373.25 50 426.65" stroke="url(#paint4_linear_259_41)" stroke-width="12" stroke-linecap="round" stroke-dasharray="1 1" />
                  <motion.path
                    d="M50 8.34998C94.8 61.75 94.8 98.4625 50 151.862C94.8 205.262 94.8 241.975 50 295.375C94.8 348.775 94.8 373.25 50 426.65"
                    stroke="url(#paint5_linear_259_41)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: mobilePathLength }}
                  />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_259_41" x1="49" y1="-38.5941" x2="49" y2="446.518" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_259_41" x1="49" y1="-38.5941" x2="49" y2="446.518" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_259_41" x1="50" y1="8.34998" x2="50" y2="426.65" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_259_41" x1="50" y1="8.34998" x2="50" y2="426.65" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_259_41" x1="50" y1="8.34998" x2="50" y2="426.65" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <linearGradient id="paint5_linear_259_41" x1="50" y1="8.34998" x2="50" y2="426.65" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00BE77" />
                    <stop offset="0.5" stop-color="#00CFAF" />
                    <stop offset="1" stop-color="#00D4E7" />
                  </linearGradient>
                  <clipPath id="clip0_259_41">
                    <rect width="69" height="167" fill="white" transform="translate(30 295)" />
                  </clipPath>
                  <clipPath id="clip1_259_41">
                    <rect width="69" height="143" fill="white" transform="matrix(-1 0 0 1 69 152)" />
                  </clipPath>
                  <clipPath id="clip2_259_41">
                    <rect width="69" height="152" fill="white" transform="translate(31)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Steps */}
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
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              ))}
            </div>

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
                {DOT_POSITIONS.map((pos, i) => (
                  <motion.g key={`dot-${i}`} style={{ opacity: dotOpacities[i] }}>
                    <circle cx={pos.x} cy={pos.y} r={22} fill={i === 3 ? '#00D4E7' : '#00BE77'} opacity={0.15} />
                    <circle cx={pos.x} cy={pos.y} r={i === 3 ? 8 : 6} fill={i === 3 ? '#00D4E7' : '#00BE77'} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  </motion.g>
                ))}
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
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
