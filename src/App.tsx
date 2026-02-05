import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';
import Hero from './components/Hero';
import CompanyOverview from './components/CompanyOverview';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
      <Hero />
      <CompanyOverview />
      <WhyChooseUs />
      <Services />
      <Gallery />
      <Clients />
      <Testimonials />
      <Footer />
      <ScrollToTop />
      </div>
    </LanguageProvider>
  );
}

export default App;
