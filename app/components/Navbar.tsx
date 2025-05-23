'use client';

import '../styles/components/navbar.scss';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelected(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link href="/" className="navbar__logo">
          <Rocket size={24} />
          Rocketly
        </Link>

        <nav className="navbar__nav">
          <button
            className={`navbar__link navbar__button ${selected === 'hero' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('hero')}
          >
            Home
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'projects' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('projects')}
          >
            Projects
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'services' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('services')}
          >
            Services
          </button>
          <button
            className={`navbar__link navbar__button ${selected === 'contact' ? 'navbar__link--active' : ''}`}
            onClick={() => handleClick('contact')}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
