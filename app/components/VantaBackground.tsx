"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
// @ts-ignore
import NET from "vanta/dist/vanta.net.min"

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x9090bb,
          backgroundColor: 0x000000,
          maxDistance: 10.00,
          spacing: 19.00
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div className="hero__background" ref={vantaRef} />
}
