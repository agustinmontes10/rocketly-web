import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowWork from './components/HowWork';
import Services from './components/Services';
import Metrics from './components/Metrics';
import Cases from './components/Cases';
import ForWhom from './components/ForWhom';
import Faq from './components/Faq';
import CtaFinal from './components/CtaFinal';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowWork />
      <Services />
      <Metrics />
      <Cases />
      <ForWhom />
      <Faq />
      <CtaFinal />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
