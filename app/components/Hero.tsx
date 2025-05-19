import '../styles/components/hero.scss';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="heading heading--xl">
            We Build Modern Web Solutions That Drive Growth
          </h1>
          <p>
            Transform your digital presence with our cutting-edge web development services. 
            We create beautiful, high-performance websites and applications that help businesses thrive.
          </p>
          <div className="hero__buttons">
            <Link href="#contact" className="button button--primary">
              Start Your Project
            </Link>
            <Link href="#projects" className="button">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}