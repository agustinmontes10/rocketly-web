'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/components/whatsappMock.scss';

interface Message {
  id: number;
  from: 'client' | 'bot';
  text: string;
  delay: number; // ms after previous message
}

const SCRIPT: Message[] = [
  { id: 1, from: 'client', text: '¿Cuándo es la próxima asamblea del consorcio?', delay: 0 },
  { id: 2, from: 'bot',    text: 'Hola! 👋 La próxima asamblea es el miércoles 25 de junio a las 19 h en el SUM del edificio.', delay: 1200 },
  { id: 3, from: 'client', text: 'Perfecto. ¿Y el pago de expensas, hasta cuándo?', delay: 2200 },
  { id: 4, from: 'bot',    text: 'Las expensas vencen el 10 de cada mes. Podés pagarlas por transferencia al CBU que te enviamos al inicio o personalmente en administración.', delay: 1400 },
  { id: 5, from: 'client', text: '¡Gracias! Muy rápido 😊', delay: 1800 },
  { id: 6, from: 'bot',    text: '¡Siempre a disposición! Si necesitás hablar con un asesor, escribí "asesor" y te conectamos al instante 🙌', delay: 900 },
];

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const TIME = formatTime();

export default function WhatsAppMock() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Start animation when element enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Sequence messages
  useEffect(() => {
    if (!started) return;
    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    SCRIPT.forEach((msg, i) => {
      accumulated += msg.delay;
      if (msg.from === 'bot') {
        // Show typing indicator before bot message
        timers.push(setTimeout(() => setTyping(true), accumulated));
        accumulated += 900;
        timers.push(setTimeout(() => {
          setTyping(false);
          setVisible(prev => [...prev, msg.id]);
        }, accumulated));
      } else {
        timers.push(setTimeout(() => {
          setVisible(prev => [...prev, msg.id]);
        }, accumulated));
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [started]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visible, typing]);

  return (
    <div className="wa-mock" ref={containerRef} aria-hidden="true">
      {/* Header */}
      <div className="wa-mock__header">
        <div className="wa-mock__avatar">
          <span>RA</span>
          <span className="wa-mock__online" />
        </div>
        <div className="wa-mock__info">
          <span className="wa-mock__name">Rocketly Bot 🤖</span>
          <span className="wa-mock__status">en línea</span>
        </div>
      </div>

      {/* Chat body */}
      <div className="wa-mock__body">
        {SCRIPT.map(msg => (
          visible.includes(msg.id) ? (
            <div
              key={msg.id}
              className={`wa-mock__bubble wa-mock__bubble--${msg.from}`}
            >
              <span className="wa-mock__text">{msg.text}</span>
              <span className="wa-mock__time">
                {TIME}
                {msg.from === 'bot' && (
                  <svg viewBox="0 0 16 11" width="14" height="10" className="wa-mock__tick">
                    <path d="M11.071.653 4.42 7.304l-2.49-2.49L.575 6.167l3.845 3.845 8.003-8.004L11.071.653z" fill="currentColor"/>
                    <path d="M15.071.653 8.42 7.304 7.075 5.96l-1.353 1.353 2.697 2.697 8.004-8.004L15.071.653z" fill="currentColor"/>
                  </svg>
                )}
              </span>
            </div>
          ) : null
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="wa-mock__bubble wa-mock__bubble--bot wa-mock__bubble--typing">
            <span className="wa-mock__dot" />
            <span className="wa-mock__dot" />
            <span className="wa-mock__dot" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="wa-mock__input">
        <span className="wa-mock__input-text">Escribí un mensaje…</span>
        <button className="wa-mock__send" aria-label="Enviar" tabIndex={-1}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
