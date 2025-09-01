'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import '@/app/styles/components/howWork.scss'

interface StepProps {
  step: { title: string; description: string }
  index: number
  setActiveStep: (index: number) => void
}

function StepComponent({ step, index, setActiveStep }: StepProps) {
  const [ref, inView] = useInView({ threshold: 0 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) setActiveStep(index)
  }, [inView, index, setActiveStep])

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 })
    } else {
      controls.start({ opacity: 0, y: 50 })
    }
  }, [inView, controls])

  return (
    <section ref={ref} className="scroll-step">
      <motion.h2 animate={controls} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1.2 }}>
        {step.title}
      </motion.h2>
      <motion.p animate={controls} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1 }}>
        {step.description}
      </motion.p>
    </section>
  )
}

export default function HowWork() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: t('howWork.step1.title'), description: t('howWork.step1.description') },
    { title: t('howWork.step2.title'), description: t('howWork.step2.description') },
    { title: t('howWork.step3.title'), description: t('howWork.step3.description') },
    { title: t('howWork.step4.title'), description: t('howWork.step4.description') },
  ];

  return (
    <div className="section howWork">
      {/* Stars behind all steps */}
      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }} />
        ))}
      </div>

      {steps.map((step, index) => (
        <StepComponent
          key={index}
          step={step}
          index={index}
          setActiveStep={setActiveStep}
        />
      ))}
    </div>
  )
}
