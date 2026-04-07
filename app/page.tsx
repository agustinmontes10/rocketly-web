import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import HowWork from './components/HowWork';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowWork />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}