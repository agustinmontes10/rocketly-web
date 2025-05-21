'use client';

import { useEffect } from 'react';

export default function RocketCursor() {
  useEffect(() => {
    const rocket = document.createElement('img');
    rocket.src = '/assets/rocket.png';
    rocket.style.position = 'fixed';
    rocket.style.pointerEvents = 'none';
    rocket.style.width = '40px';
    rocket.style.zIndex = '9999';
    rocket.style.transition = 'transform 0.4s ease';
    document.body.appendChild(rocket);

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastRotation = 0;
    const ROTATION_THRESHOLD = 20; // distancia mínima para girar

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement('div');
      trail.style.position = 'fixed';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.width = '10px';
      trail.style.height = '10px';
      trail.style.borderRadius = '50%';
      trail.style.background = 'rgba(255,255,255,0.4)';
      trail.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9998';
      trail.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      trail.style.transform = 'scale(1)';
      document.body.appendChild(trail);

      requestAnimationFrame(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(2)';
      });

      setTimeout(() => {
        trail.remove();
      }, 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      let rotation = lastRotation;

      if (distance > ROTATION_THRESHOLD) {
        // Movimiento dominante
        if (Math.abs(dx) > Math.abs(dy)) {
          rotation = dx > 0 ? 45 : 225;
        } else {
          rotation = dy > 0 ? 135 : 315;
        }

        lastX = mouseX;
        lastY = mouseY;
        lastRotation = rotation;
      }

      const x = mouseX - 20;
      const y = mouseY - 20;

      rocket.style.left = `${x}px`;
      rocket.style.top = `${y}px`;
      rocket.style.transform = `rotate(${rotation}deg)`;

      createTrail(x + 20, y + 20);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      rocket.remove();
    };
  }, []);

  return null;
}
