'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '@/app/styles/components/howWork.scss'

const steps = [
    { title: 'Planificación', description: 'Investigamos, analizamos y nos alineamos con tus objetivos.' },
    { title: 'Diseño', description: 'Creamos prototipos y experiencias centradas en el usuario.' },
    { title: 'Desarrollo', description: 'Codificamos con precisión y pasión.' },
    { title: 'Lanzamiento', description: 'Desplegamos y te acompañamos al infinito 🚀' },
]

export default function HowWork() {
    const [activeStep, setActiveStep] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <div ref={scrollContainerRef} className="scroll-container">
                <div className="rocket-indicator">
                    {/* Podés animar este cohete con más lógica */}
                    <motion.img
                        src="/assets/rocket.png"
                        alt="rocket"
                        animate={{ rotate: activeStep * 90 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    />
                </div>

                {steps.map((step, index) => {
                    const [ref, inView] = useInView({ threshold: 0.5 })

                    useEffect(() => {
                        if (inView) {
                            setActiveStep(index)
                        }
                    }, [inView])

                    const controls = useAnimation()

                    useEffect(() => {
                        if (inView) {
                            controls.start({ opacity: 1, y: 0 })
                        } else {
                            controls.start({ opacity: 0, y: 50 })
                        }
                    }, [inView, controls])

                    return (
                        <section ref={ref} key={index} className="scroll-step">
                            <motion.h2 animate={controls} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1.2 }}>
                                {step.title}
                            </motion.h2>
                            <motion.p animate={controls} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1 }}>
                                {step.description}
                            </motion.p>
                        </section>
                    )
                })}


            </div>

            <div className="stars">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="star" />
                ))}
            </div>
        </div>

    )
}
