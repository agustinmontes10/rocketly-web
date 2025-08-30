'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '@/app/styles/components/howWork.scss'

const steps = [
  { title: 'Planificación', description: 'Investigamos, analizamos y nos alineamos con tus objetivos.' },
  { title: 'Diseño', description: 'Creamos prototipos y experiencias centradas en el usuario.' },
  { title: 'Desarrollo', description: 'Codificamos con precisión y pasión.' },
  { title: 'Lanzamiento', description: 'Desplegamos y te acompañamos al infinito 🚀' },
]

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
  const [activeStep, setActiveStep] = useState(0)

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
