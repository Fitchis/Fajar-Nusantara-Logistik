'use client';

import { Quote, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/providers/language-provider';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Chaerul Anwar',
      position: 'General Manager',
      company: 'Suzuki Nenggapratama',
      text: 'Pengiriman cepat dan aman. Tim INL sangat profesional dalam menangani setiap pengiriman kendaraan kami. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Fery Irawan',
      position: 'COO',
      company: 'Kalla Kars',
      text: 'Sudah beberapa kali pakai jasanya, selalu tepat waktu dan terpercaya.',
      rating: 5,
    },
    {
      name: 'Yusril',
      position: 'General Manager',
      company: 'Vespa Putra Sulawesi',
      text: 'Pelayanannya ramah dan responsif, jadi tenang selama proses pengiriman',
      rating: 5,
    },
    {
      name: 'Jaka Adriyanto',
      position: 'Director',
      company: 'PT. Restu Prima Mandiri',
      text: 'Armada lengkap, jadi pengiriman antar pulau jadi lebih mudah.',
      rating: 5,
    },
  ];

  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [testimonials.length]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    }
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % testimonials.length);
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    }
  };

  const { t } = useLanguage();
  const currentTestimonial = testimonials[index];

  return (
    <section className="py-20 bg-gradient-to-br from-[#002147] to-[#003366]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('testimonials')}</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">Kepuasan klien adalah prioritas kami</p>
        </div>

        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <Quote className="h-12 w-12 text-brand opacity-80" />
              <div className="flex gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-gray-200 text-lg mb-6 leading-relaxed italic">"{currentTestimonial.text}"</p>

            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">{currentTestimonial.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{currentTestimonial.name}</h4>
                <p className="text-brand">{currentTestimonial.position}</p>
                <p className="text-gray-300 text-sm">{currentTestimonial.company}</p>
              </div>
            </div>
          </div>

          <button aria-label="Previous testimonial" onClick={goPrev} className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full shadow-md">
            ‹
          </button>
          <button aria-label="Next testimonial" onClick={goNext} className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full shadow-md">
            ›
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-brand' : 'bg-white/30'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ingin Berbagi Pengalaman Anda?</h3>
            <p className="text-gray-300 mb-6">Kami senang mendengar feedback dari klien kami untuk terus meningkatkan kualitas layanan</p>
            <a href="https://wa.me/6282156785580" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all duration-200 shadow-lg hover:shadow-xl">
              {t('contact_us')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
