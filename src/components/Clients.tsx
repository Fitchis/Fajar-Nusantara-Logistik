import { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
// Static imports as guaranteed fallbacks when Vite glob fails in dev environment
import aion from '../assets/clients/aion-seeklogo.png';
import artana from '../assets/clients/artanaland.png';
import baic from '../assets/clients/baic.png';
import mandiri from '../assets/clients/bank-mandiri-seeklogo.png';
import benelli from '../assets/clients/benelli-seeklogo.png';
import honda from '../assets/clients/honda-silver-seeklogo.png';
import kalla from '../assets/clients/kalla-group-seeklogo.png';
import keeway from '../assets/clients/keeway-seeklogo.png';
import mtl from '../assets/clients/mtl.jpg';
import mutiaraland from '../assets/clients/mutiaraland.jpg';
import npi from '../assets/clients/npi.jpeg';
import pramika from '../assets/clients/pramika.jpeg';
import pln from '../assets/clients/pt-pln-persero-seeklogo.png';
import suzuki from '../assets/clients/suzuki-seeklogo.png';
import united from '../assets/clients/united.png';
import vale from '../assets/clients/vale-seeklogo.png';
import vespa from '../assets/clients/vespa-seeklogo.png';

const Clients = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const { t } = useLanguage();

  // Load all client images into a filename -> src map
  const imageMap = useMemo(() => {
    type GlobModule = Record<string, { default: string }>;
    interface ImportMetaGlobEager { globEager: (pattern: string) => GlobModule; }
    try {
      const modules = (import.meta as unknown as ImportMetaGlobEager).globEager('../assets/clients/*.{png,jpg,jpeg,svg}') as GlobModule;
      return Object.keys(modules).reduce((acc: Record<string, string>, key) => {
        const fn = (key.split('/').pop() || key).toLowerCase();
        acc[fn] = modules[key].default;
        return acc;
      }, {});
    } catch {
      return {} as Record<string, string>;
    }
  }, []);

  // Static image map fallback (use when glob returns empty)
  const staticImageMap = useMemo<Record<string, string>>(() => ({
    'aion-seeklogo.png': aion,
    'artanaland.png': artana,
    'baic.png': baic,
    'bank-mandiri-seeklogo.png': mandiri,
    'benelli-seeklogo.png': benelli,
    'honda-silver-seeklogo.png': honda,
    'kalla-group-seeklogo.png': kalla,
    'keeway-seeklogo.png': keeway,
    'mtl.jpg': mtl,
    'mutiaraland.jpg': mutiaraland,
    'npi.jpeg': npi,
    'pramika.jpeg': pramika,
    'pt-pln-persero-seeklogo.png': pln,
    'suzuki-seeklogo.png': suzuki,
    'united.png': united,
    'vale-seeklogo.png': vale,
    'vespa-seeklogo.png': vespa,
  }), []);

  const effectiveImageMap = Object.keys(imageMap).length ? imageMap : staticImageMap;

  // Explicit groupings and order using the provided filenames
  const groups = useMemo(() => {
    const corporateFiles = ['bank-mandiri-seeklogo.png', 'pt-pln-persero-seeklogo.png', 'vale-seeklogo.png', 'kalla-group-seeklogo.png', 'npi.jpeg'];
    const otomotifFiles = ['honda-silver-seeklogo.png', 'suzuki-seeklogo.png', 'vespa-seeklogo.png', 'baic.png', 'keeway-seeklogo.png', 'aion-seeklogo.png', 'benelli-seeklogo.png', 'united.png'];
    const propertyFiles = ['artanaland.png', 'mutiaraland.jpg', 'pramika.jpeg'];
    const forwarderFiles: string[] = ['mtl.jpg'];

    const mapToImgs = (list: string[]) =>
      list
        .map((f) => {
          const src = effectiveImageMap[f.toLowerCase()];
          return src ? { src, name: f } : null;
        })
        .filter((x): x is { src: string; name: string } => x !== null);

    return {
      forwarder: { title: 'Forwarder', items: mapToImgs(forwarderFiles), color: 'from-emerald-500 to-teal-600' },
      corporate: { title: 'Corporate', items: mapToImgs(corporateFiles), color: 'from-blue-500 to-indigo-600' },
      otomotif: { title: 'Otomotif & Kendaraan', items: mapToImgs(otomotifFiles), color: 'from-orange-500 to-red-600' },
      properti: { title: 'Properti & Pengembangan Lahan', items: mapToImgs(propertyFiles), color: 'from-purple-500 to-pink-600' },
    };
  }, [effectiveImageMap]);

  const allClients = useMemo(() => {
    return Object.entries(groups).flatMap(([key, group]) => 
      group.items.map(item => ({ ...item, category: key }))
    );
  }, [groups]);

  const filteredClients = activeCategory === 'all' 
    ? allClients 
    : allClients.filter(c => c.category === activeCategory);

  const categories = [
    { id: 'all', label: t('all_clients'), icon: '🌐' },
    { id: 'forwarder', label: t('forwarder'), icon: '📦' },
    { id: 'corporate', label: t('corporate'), icon: '🏢' },
    { id: 'otomotif', label: t('otomotif'), icon: '🏍️' },
    { id: 'properti', label: t('properti'), icon: '🏗️' },
  ];

  const totalClients = allClients.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.client-card-new');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredClients, activeCategory]);

  return (
    <section id="clients" className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-indigo-100">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-white" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {totalClients}+ Klien Terpercaya
              </span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-800 to-sky-900 mb-4 leading-tight">
            {t('partner_heading')}
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dipercaya oleh brand terkemuka di Indonesia — dari korporasi hingga UMKM
          </p>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Trusted Partners</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span>⭐️ 5.0 Rating</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span>🚀 Fast Response</span>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter */}
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
                <span className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                  {cat.id !== 'all' && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === cat.id ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                      {groups[cat.id as keyof typeof groups]?.items.length || 0}
                    </span>
                  )}
                </span>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Clients Grid with Staggered Animation */}
        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredClients.map((client, index) => (
              <div
                key={`${client.category}-${client.name}-${index}`}
                className="client-card-new opacity-0 translate-y-4"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transitionDelay: `${index * 30}ms`
                }}
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div className="group relative h-full">
                  {/* Card */}
                  <div className="relative h-full p-6 bg-white rounded-2xl border-2 border-transparent hover:border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                      groups[client.category as keyof typeof groups]?.color
                    } opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Image Container */}
                    <div className="relative flex items-center justify-center h-20">
                      <img
                        src={client.src}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
                  </div>

                  {/* Floating Badge */}
                  {hoveredClient === client.name && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg animate-bounce-slow">
                      Partner
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Forwarder Section */}
        {groups.forwarder.items.length > 0 && (
          <div className="mb-16">
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 transform hover:rotate-3 transition-transform duration-300">
                    <img
                      src={groups.forwarder.items[0].src}
                      alt="PT. Mitra Transportasi Logistik"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-white text-center md:text-left">
                  <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
                     Featured Partner
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3">
                    PT. Mitra Transportasi Logistik
                  </h3>
                  <p className="text-emerald-50 text-lg leading-relaxed max-w-2xl">
                    Partner utama kami dalam solusi freight forwarding dan logistik terpadu
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative">
          <div className="relative p-10 md:p-16 bg-gradient-to-br from-sky-500 via-blue-400 to-sky-400 rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
            <div className="relative text-center">
              <div className="inline-block mb-6">
                <div className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <span className="text-white font-semibold">{t('be_part')}</span>
                </div>
              </div>

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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
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
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-blue-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{t('trusted_by')} {totalClients}+ {t('companies')}</span>
                </div>
                <div className="w-px h-4 bg-blue-400" />
                <div className="flex items-center gap-2">
                  <span>🚀</span>
                  <span className="font-semibold">Response dalam 2 Jam</span>
                </div>
                <div className="w-px h-4 bg-blue-400" />
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span className="font-semibold">100% Terpercaya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .client-card-new.animate-in {
          animation: slideUp 0.6s ease-out forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;