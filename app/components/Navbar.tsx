'use client';

import '../styles/components/navbar.scss';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link href="/" className="navbar__logo">
          <Rocket size={24} />
          Rocketly
        </Link>
        
        <nav className="navbar__nav">
          <Link 
            href="/" 
            className={`navbar__link ${pathname === '/' ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="#projects" 
            className="navbar__link"
          >
            Projects
          </Link>
          <Link 
            href="#services" 
            className="navbar__link"
          >
            Services
          </Link>
          <Link 
            href="#contact" 
            className="navbar__link"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}