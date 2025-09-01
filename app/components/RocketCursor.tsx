'use client';

import { useEffect } from 'react';

export default function RocketCursor() {
  useEffect(() => {
    const rocket = document.createElement('img');
    rocket.src = '/assets/rocket.png';
    rocket.style.position = 'fixed';
    rocket.style.pointerEvents = 'none';
    rocket.style.width = '30px'; // Made smaller (was 40px)
    rocket.style.zIndex = '9999';
    rocket.style.transition = 'transform 0.7s ease';
    document.body.appendChild(rocket);

    // Hide the native cursor globally with CSS
    const style = document.createElement('style');
    style.id = 'rocket-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
      body {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

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

      // Position the image so its top-left corner is at the cursor position
      const x = mouseX;
      const y = mouseY;

      rocket.style.left = `${x}px`;
      rocket.style.top = `${y}px`;
      // Fixed rotation - pointing to left top (315 degrees)
      rocket.style.transform = `rotate(-90deg)`;

      // 👇 Detecta si está sobre un link del nav
      const target = e.target as HTMLElement;
      if (target.closest('.navbar__link') || target.closest('.button')) {
        console.log('paso')
        rocket.style.filter = 'brightness(3)';

        // rocket.style.filter = 'brightness(0) invert(1)';
        // rocket.style.filter = 'hue-rotate(180deg) brightness(1.2)';
      } else {
        console.log('no paso')
        rocket.style.filter = 'none';
      }

      // Trail position adjusted to come from the rocket's position
      createTrail(x + 15, y + 15);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      rocket.remove();
      // Remove the cursor hiding CSS when component unmounts
      const style = document.getElementById('rocket-cursor-style');
      if (style) {
        style.remove();
      }
    };
  }, []);

  return null;
}
