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
    rocket.style.transition = 'transform 0.2s ease';

    document.body.appendChild(rocket);

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

    const getNearestDirectionAngle = (angleRad: number) => {
      const angleDeg = (angleRad * 180) / Math.PI;
      const directions = [0, 45, 90, 135, 180, -135, -90, -45];

      let closest = directions[0];
      let minDiff = Math.abs(angleDeg - closest);

      for (const dir of directions) {
        const diff = Math.abs(angleDeg - dir);
        if (diff < minDiff) {
          minDiff = diff;
          closest = dir;
        }
      }

      return closest;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rocketX = rocket.offsetLeft + rocket.offsetWidth / 2;
      const rocketY = rocket.offsetTop + rocket.offsetHeight / 2;

      const dx = e.clientX - rocketX;
      const dy = e.clientY - rocketY;

      const angle = Math.atan2(dy, dx);
      const snappedAngle = getNearestDirectionAngle(angle);

      const x = e.clientX - 20;
      const y = e.clientY - 20;

      rocket.style.left = `${x}px`;
      rocket.style.top = `${y}px`;
      rocket.style.transform = `rotate(${snappedAngle}deg)`;

      createTrail(x + 20, y + 20); // justo en el centro
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      rocket.remove();
    };
  }, []);

  return null;
}
