import type { MouseEvent } from 'react';

/**
 * Actualiza las custom properties --spot-x / --spot-y con la posición del
 * cursor relativa al elemento, para alimentar el mixin SCSS `spotlight`.
 */
export function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}
