import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { Car, Package, Construction, Building2 } from 'lucide-react';

// Static imports as a reliable fallback in case Vite glob doesn't resolve at runtime
import kapal1 from '../assets/kapal/1.jpeg';
import kapal2 from '../assets/kapal/2.jpeg';
import kapal3 from '../assets/kapal/3.jpeg';
import kapal4 from '../assets/kapal/4.jpeg';
import kapal5 from '../assets/kapal/5.jpeg';
import kapal6 from '../assets/kapal/6.jpeg';
import kapal9 from '../assets/kapal/9.jpeg';
import kapal10 from '../assets/kapal/10.jpeg';
import kapal11 from '../assets/kapal/11.jpeg';
import kapal12 from '../assets/kapal/12.jpeg';
import kapal13 from '../assets/kapal/13.jpeg';
// Statically import the actual kendaraan image present in the repo so it always resolves
import kendaraanStatic from '../assets/Kendaraan/Kendaraan-1.jpeg';
// Fallback kendaraan image (use kapal fallback only if kendaraan image also missing)
import kendaraanFallback from '../assets/kapal/1.jpeg';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type CategoryEntry = {
  titleKey: string;
  descriptionKey?: string;
  icon: IconType;
  image?: string;
  alt?: string;
};

const categories: CategoryEntry[] = [
  {
    titleKey: 'cat_pengiriman_kendaraan_title',
    icon: Car,
    alt: 'Mobil di jalan siap dikirim',
    descriptionKey: 'cat_pengiriman_kendaraan_desc',
  },
  {
    titleKey: 'cat_barang_title',
    icon: Package,
    image:
      'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Kartu kargo dan paket siap dikirim',
    descriptionKey: 'cat_barang_desc',
  },
  {
    titleKey: 'cat_alatberat_title',
    icon: Construction,
    image:
      'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Alat berat di lokasi proyek',
    descriptionKey: 'cat_alatberat_desc',
  },
  {
    titleKey: 'cat_material_title',
    icon: Building2,
    image:
      'https://images.pexels.com/photos/4482929/pexels-photo-4482929.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Material proyek ditata di gudang',
    descriptionKey: 'cat_material_desc',
  },
  {
    titleKey: 'cat_kapal_title',
    icon: Building2,
    descriptionKey: 'cat_kapal_desc',
  },
];

const Gallery: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Import kapal images from assets/kapal using Vite glob (eager)
  const kapalImages = useMemo(() => {
    // fallback array from explicit imports
    const fallback = [kapal1, kapal2, kapal3, kapal4, kapal5, kapal6, kapal9, kapal10, kapal11, kapal12, kapal13];
    type GlobModule = Record<string, { default: string }>;
    const meta = import.meta as unknown as { globEager: (pattern: string) => GlobModule };
    try {
      const modules = meta.globEager('../assets/kapal/*.{jpg,jpeg,png}');
      const imgs = Object.values(modules).map((m) => m.default);
      return imgs.length ? imgs : fallback;
    } catch {
      return fallback;
    }
  }, []);

  // Import kendaraan images from assets/Kendaraan using Vite glob (eager)
  const kendaraanImages = useMemo(() => {
    type GlobModule = Record<string, { default: string }>;
    const meta = import.meta as unknown as { globEager: (pattern: string) => GlobModule };

    // Try multiple glob patterns: relative and absolute (/src/...) to increase chance of matching
    const tryPatterns = ['../assets/Kendaraan/*.{jpg,jpeg,png}', '../assets/kendaraan/*.{jpg,jpeg,png}', '/src/assets/Kendaraan/*.{jpg,jpeg,png}', '/src/assets/kendaraan/*.{jpg,jpeg,png}'];
    try {
      for (const pattern of tryPatterns) {
        try {
          const modules = meta.globEager(pattern);
          const imgs = Object.values(modules).map((m) => m.default);
          if (imgs && imgs.length) return imgs;
        } catch {
          // ignore and try next pattern
        }
      }

      // nothing found from glob, fall back to the static kendaraan image we imported
      return [kendaraanStatic || kendaraanFallback];
    } catch {
      return [kendaraanStatic || kendaraanFallback];
    }
  }, []);

  // Slider state for kapal images
  const [kapalIndex, setKapalIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Slider state for kendaraan images
  const [kendaraanIndex, setKendaraanIndex] = useState(0);
  const [kendaraanLightboxOpen, setKendaraanLightboxOpen] = useState(false);
  const [kendaraanLightboxIndex, setKendaraanLightboxIndex] = useState(0);

  const prevKapal = () => {
    if (kapalImages.length === 0) return;
    setKapalIndex((i) => (i - 1 + kapalImages.length) % kapalImages.length);
  };
  const nextKapal = () => {
    if (kapalImages.length === 0) return;
    setKapalIndex((i) => (i + 1) % kapalImages.length);
  };

  const prevKendaraan = () => {
    if (kendaraanImages.length === 0) return;
    setKendaraanIndex((i) => (i - 1 + kendaraanImages.length) % kendaraanImages.length);
  };
  const nextKendaraan = () => {
    if (kendaraanImages.length === 0) return;
    setKendaraanIndex((i) => (i + 1) % kendaraanImages.length);
  };

  // Reset kapal index if images change
  useEffect(() => {
    if (!kapalImages.length) setKapalIndex(0);
    else setKapalIndex((i) => (i >= kapalImages.length ? 0 : i));
  }, [kapalImages.length]);

  // Reset kendaraan index if images change
  useEffect(() => {
    if (!kendaraanImages.length) setKendaraanIndex(0);
    else setKendaraanIndex((i) => (i >= kendaraanImages.length ? 0 : i));
  }, [kendaraanImages.length]);

  // Update animated indicator position/size
  useEffect(() => {
    const updateIndicator = () => {
      const btn = tabsRef.current[active];
      const el = indicatorRef.current;
      if (!btn || !el) return;
      const rect = btn.getBoundingClientRect();
      const parentRect = btn.parentElement!.getBoundingClientRect();
      el.style.transform = `translateX(${rect.left - parentRect.left}px)`;
      el.style.width = `${rect.width}px`;
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002147] mb-3">{t('business_lines')}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t('business_subtitle')}</p>
        </div>

        {/* Lightbox modal for full-size images */}
        {lightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setLightboxOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setLightboxOpen(false);
              if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % kapalImages.length);
              if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + kapalImages.length) % kapalImages.length);
            }}
            tabIndex={-1}
          >
            <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Tutup"
                className="absolute right-2 top-2 bg-white/80 rounded-full p-2 z-10"
                onClick={() => setLightboxOpen(false)}
              >
                ✕
              </button>

              <img src={kapalImages[lightboxIndex]} alt={`Kapal ${lightboxIndex + 1}`} className="w-full h-auto max-h-[80vh] object-contain rounded" />

              <button
                aria-label="Sebelumnya"
                onClick={() => setLightboxIndex((i) => (i - 1 + kapalImages.length) % kapalImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                aria-label="Berikutnya"
                onClick={() => setLightboxIndex((i) => (i + 1) % kapalImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Kendaraan lightbox */}
        {kendaraanLightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setKendaraanLightboxOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setKendaraanLightboxOpen(false);
              if (e.key === 'ArrowRight') setKendaraanLightboxIndex((i) => (i + 1) % kendaraanImages.length);
              if (e.key === 'ArrowLeft') setKendaraanLightboxIndex((i) => (i - 1 + kendaraanImages.length) % kendaraanImages.length);
            }}
            tabIndex={-1}
          >
            <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Tutup"
                className="absolute right-2 top-2 bg-white/80 rounded-full p-2 z-10"
                onClick={() => setKendaraanLightboxOpen(false)}
              >
                ✕
              </button>

              <img src={kendaraanImages[kendaraanLightboxIndex]} alt={`Kendaraan ${kendaraanLightboxIndex + 1}`} className="w-full h-auto max-h-[80vh] object-contain rounded" />

              <button
                aria-label="Sebelumnya"
                onClick={() => setKendaraanLightboxIndex((i) => (i - 1 + kendaraanImages.length) % kendaraanImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                aria-label="Berikutnya"
                onClick={() => setKendaraanLightboxIndex((i) => (i + 1) % kendaraanImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Tabs with animated indicator */}
        <div className="mb-8">
          <div className="relative">
            <div role="tablist" aria-label="Kategori Pengiriman" className="flex gap-3 justify-center flex-wrap">
              {categories.map((cat, idx) => (
                <button
                  key={cat.titleKey}
                  ref={(el) => (tabsRef.current[idx] = el)}
                  id={`tab-${idx}`}
                  role="tab"
                  aria-controls={`panel-${idx}`}
                  aria-selected={active === idx}
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') setActive((s) => (s + 1) % categories.length);
                    if (e.key === 'ArrowLeft') setActive((s) => (s - 1 + categories.length) % categories.length);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    active === idx ? 'bg-sky-600 text-white shadow-md' : 'bg-white/60 text-slate-700 hover:bg-white/80'
                  }`}
                >
                  {t(cat.titleKey)}
                </button>
              ))}
            </div>

            <div
              ref={indicatorRef}
              aria-hidden
              className="absolute bottom-0 h-0.5 bg-sky-600 rounded transition-all duration-300"
              style={{ width: 0, transform: 'translateX(0px)' }}
            />
          </div>

          {/* Panel */}
          <div id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-6">
              {(() => {
              const cat = categories[active] as CategoryEntry;
              const Icon = cat.icon;
              const titleKey = cat.titleKey || '';
              const isKapal = titleKey.includes('kapal');
              // If category is Kendaraan, prefer local kendaraan images
              const isKendaraan = titleKey.includes('kendaraan');
              const panelImage = isKendaraan && kendaraanImages.length ? kendaraanImages[0] : cat.image;

              // Kapal slider
              if (isKapal && kapalImages.length > 0) {
                return (
                  <article className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="relative h-80 md:h-96 overflow-hidden">
                      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${kapalIndex * 100}%)` }}>
                        {kapalImages.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${t(cat.titleKey)} ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full flex-shrink-0 object-cover h-80 md:h-96 cursor-zoom-in"
                            onClick={() => {
                              setLightboxIndex(i);
                              setLightboxOpen(true);
                            }}
                          />
                        ))}
                      </div>

                      <button onClick={prevKapal} aria-label="Sebelumnya" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">‹</button>
                      <button onClick={nextKapal} aria-label="Berikutnya" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">›</button>

                      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                        {kapalImages.map((_, i) => (
                          <button key={i} onClick={() => setKapalIndex(i)} aria-label={`Pilih gambar ${i + 1}`} className={`w-2 h-2 rounded-full transition-all ${kapalIndex === i ? 'bg-white scale-125' : 'bg-white/60'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center mb-2">
                        <div className="bg-white/10 p-3 rounded-lg mr-3 shadow-sm">
                          {Icon ? <Icon className="h-6 w-6 text-white" aria-hidden /> : null}
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{t(cat.titleKey)}</h3>
                      </div>
                        <p className="text-gray-200 text-sm md:text-base">{cat.descriptionKey ? t(cat.descriptionKey) : ''}</p>
                    </div>
                  </article>
                );
              }

              // Kendaraan slider
              if (isKendaraan && kendaraanImages.length > 0) {
                return (
                  <article className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="relative h-80 md:h-96 overflow-hidden">
                      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${kendaraanIndex * 100}%)` }}>
                        {kendaraanImages.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${t(cat.titleKey)} ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full flex-shrink-0 object-cover h-80 md:h-96 cursor-zoom-in"
                            onClick={() => {
                              setKendaraanLightboxIndex(i);
                              setKendaraanLightboxOpen(true);
                            }}
                          />
                        ))}
                      </div>

                      <button onClick={prevKendaraan} aria-label="Sebelumnya" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">‹</button>
                      <button onClick={nextKendaraan} aria-label="Berikutnya" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">›</button>

                      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                        {kendaraanImages.map((_, i) => (
                          <button key={i} onClick={() => setKendaraanIndex(i)} aria-label={`Pilih gambar ${i + 1}`} className={`w-2 h-2 rounded-full transition-all ${kendaraanIndex === i ? 'bg-white scale-125' : 'bg-white/60'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center mb-2">
                        <div className="bg-white/10 p-3 rounded-lg mr-3 shadow-sm">
                          {Icon ? <Icon className="h-6 w-6 text-white" aria-hidden /> : null}
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{t(cat.titleKey)}</h3>
                      </div>
                      <p className="text-gray-200 text-sm md:text-base">{cat.descriptionKey ? t(cat.descriptionKey) : ''}</p>
                    </div>
                  </article>
                );
              }

              // Default panel
              return (
                <article className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 transform hover:-translate-y-1">
                  <div className="relative h-80 md:h-96 bg-gray-100 flex items-center justify-center">
                    {panelImage ? (
                      <img src={panelImage} alt={cat.alt ?? t(cat.titleKey)} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-50 to-slate-100">
                        <div className="text-center p-6">
                                      {Icon ? <Icon className="mx-auto h-12 w-12 text-sky-600 mb-3" aria-hidden /> : null}
                                      <p className="text-slate-700 font-medium">{t('image_not_available')}</p>
                                      <p className="text-sm text-slate-500">{t('add_image_prompt')}</p>
                            </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/85 to-transparent mix-blend-multiply" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center mb-2">
                      <div className="bg-white/10 p-3 rounded-lg mr-3 shadow-sm">
                        {Icon ? <Icon className="h-6 w-6 text-white" aria-hidden /> : null}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{t(cat.titleKey)}</h3>
                    </div>
                    <p className="text-gray-200 text-sm md:text-base">{cat.descriptionKey ? t(cat.descriptionKey) : ''}</p>
                  </div>
                </article>
              );
            })()}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <figure className="relative overflow-hidden rounded-xl shadow-lg h-64">
            <img src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('operational_24')} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <figcaption className="absolute inset-0 bg-[#002147]/40 flex items-center justify-center text-white font-bold text-xl">{t('operational_24')}</figcaption>
          </figure>

          <figure className="relative overflow-hidden rounded-xl shadow-lg h-64">
            <img src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('armada_lengkap')} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <figcaption className="absolute inset-0 bg-[#002147]/40 flex items-center justify-center text-white font-bold text-xl">{t('armada_lengkap')}</figcaption>
          </figure>

          <figure className="relative overflow-hidden rounded-xl shadow-lg h-64">
            <img src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('gudang_modern')} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <figcaption className="absolute inset-0 bg-[#002147]/40 flex items-center justify-center text-white font-bold text-xl">{t('gudang_modern')}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
