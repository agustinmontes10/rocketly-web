import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import ProjectSlider from './components/ProjectSlider';
import Contact from './components/Contact';
import HowWork from './components/HowWork';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectSlider />
      <Projects />
      <Services />
      <HowWork />
      <Contact />
      <Footer />
    </main>
  );
}