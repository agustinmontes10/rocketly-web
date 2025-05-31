import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import HowWork from './components/HowWork';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      {/* <Projects /> */}
      <HowWork />
      <Contact />
    </main>
  );
}