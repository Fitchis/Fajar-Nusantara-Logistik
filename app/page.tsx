import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import CompanyOverview from '@/components/company-overview';
import WhyChooseUs from '@/components/why-choose-us';
import Services from '@/components/services';
import Gallery from '@/components/gallery';
import Clients from '@/components/clients';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function Home() {
  return (
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
  );
}
