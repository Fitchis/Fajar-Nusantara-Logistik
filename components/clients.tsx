'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';

const Clients = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t } = useLanguage();

  const clients = [
    { name: 'Bank Mandiri', category: 'corporate', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'PT PLN', category: 'corporate', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Vale', category: 'corporate', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Kalla Group', category: 'corporate', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Honda', category: 'otomotif', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Suzuki', category: 'otomotif', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Vespa', category: 'otomotif', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Artanaland', category: 'properti', logo: '/placeholder.svg?height=100&width=150' },
    { name: 'Mutiaraland', category: 'properti', logo: '/placeholder.svg?height=100&width=150' },
  ];

  const filteredClients = activeCategory === 'all' 
    ? clients 
    : clients.filter(c => c.category === activeCategory);

  const categories = [
    { id: 'all', label: t('all_clients') },
    { id: 'corporate', label: t('corporate') },
    { id: 'otomotif', label: t('otomotif') },
    { id: 'properti', label: t('properti') },
  ];

  return (
    <section id="clients" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-800 to-sky-900 mb-4 leading-tight">
            {t('partner_heading')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dipercaya oleh brand terkemuka di Indonesia — dari korporasi hingga UMKM
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#002147] to-blue-900 text-white shadow-xl scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg hover:scale-105 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredClients.map((client, index) => (
              <div key={`${client.category}-${client.name}-${index}`} className="group relative h-full">
                <div className="relative h-full p-6 bg-white rounded-2xl border-2 border-transparent hover:border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative flex items-center justify-center h-20">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative p-10 md:p-16 bg-gradient-to-br from-sky-500 via-blue-400 to-sky-400 rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative text-center">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {t('join_clients')}
              </h3>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Ratusan perusahaan telah mempercayai kami untuk kebutuhan logistik mereka.
                Saatnya giliran Anda merasakan pelayanan terbaik kami.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative px-8 py-4 bg-white text-[#002147] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>{t('contact_us')}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>

                <a
                  href="https://wa.me/6282156785580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>💬</span>
                    <span>{t('chat_whatsapp')}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
