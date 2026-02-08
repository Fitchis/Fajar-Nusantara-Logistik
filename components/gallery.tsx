'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { Car, Package, Construction, Building2 } from 'lucide-react';

type CategoryEntry = {
  titleKey: string;
  descriptionKey?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt?: string;
};

const Gallery = () => {
  const [active, setActive] = useState(0);

  const categories: CategoryEntry[] = [
    {
      titleKey: 'cat_pengiriman_kendaraan_title',
      icon: Car,
      alt: 'Vehicle shipping',
      descriptionKey: 'cat_pengiriman_kendaraan_desc',
    },
    {
      titleKey: 'cat_barang_title',
      icon: Package,
      alt: 'Cargo',
      descriptionKey: 'cat_barang_desc',
    },
    {
      titleKey: 'cat_alatberat_title',
      icon: Construction,
      alt: 'Heavy equipment',
      descriptionKey: 'cat_alatberat_desc',
    },
    {
      titleKey: 'cat_material_title',
      icon: Building2,
      alt: 'Project materials',
      descriptionKey: 'cat_material_desc',
    },
    {
      titleKey: 'cat_kapal_title',
      icon: Building2,
      descriptionKey: 'cat_kapal_desc',
    },
  ];

  const { t } = useLanguage();

  const cat = categories[active] as CategoryEntry;
  const Icon = cat.icon;

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002147] mb-3">{t('business_lines')}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t('business_subtitle')}</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div role="tablist" aria-label="Business categories" className="flex gap-3 justify-center flex-wrap">
              {categories.map((cat, idx) => (
                <button
                  key={cat.titleKey}
                  id={`tab-${idx}`}
                  role="tab"
                  aria-controls={`panel-${idx}`}
                  aria-selected={active === idx}
                  onClick={() => setActive(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    active === idx ? 'bg-sky-600 text-white shadow-md' : 'bg-white/60 text-slate-700 hover:bg-white/80'
                  }`}
                >
                  {t(cat.titleKey)}
                </button>
              ))}
            </div>
          </div>

          <div id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-6">
            <article className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-80 md:h-96 bg-gradient-to-tr from-slate-50 to-slate-100 flex items-center justify-center">
                <img src="/placeholder.svg?height=400&width=800" alt={t(cat.titleKey)} className="w-full h-full object-cover" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
