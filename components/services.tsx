'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { Truck, Ship, Plane, CheckCircle } from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('darat');

  const services = {
    darat: {
      icon: Truck,
      title: 'Layanan Darat',
      items: [
        {
          name: 'FTL (Full Truck Loader)',
          description: 'Pengiriman dengan truck penuh untuk volume besar',
        },
        {
          name: 'LTL (Less Truck Loader)',
          description: 'Pengiriman dengan kapasitas truck parsial untuk volume kecil hingga menengah',
        },
        {
          name: 'Charter Transport',
          description: 'Sewa kendaraan khusus sesuai kebutuhan pengiriman Anda',
        },
      ],
    },
    laut: {
      icon: Ship,
      title: 'Layanan Laut',
      items: [
        {
          name: 'Kapal Cepat',
          description: 'Pengiriman cepat antar pulau dengan kapal express',
        },
        {
          name: 'Kapal PELNI',
          description: 'Pengiriman ekonomis melalui jalur kapal PELNI',
        },
        {
          name: 'Kargo Kontainer',
          description: 'Pengiriman barang dalam volume besar menggunakan kontainer',
        },
        {
          name: 'Kapal RO-RO',
          description: 'Pengiriman kendaraan dan alat berat dengan kapal Roll-on/Roll-off',
        },
        {
          name: 'Project Cargo',
          description: 'Penanganan khusus untuk kargo proyek skala besar',
        },
      ],
    },
    udara: {
      icon: Plane,
      title: 'Layanan Udara',
      items: [
        {
          name: 'Seluruh Maskapai Domestik',
          description: 'Kerjasama dengan semua maskapai penerbangan domestik',
        },
        {
          name: 'Port-to-Port / Door-to-Door',
          description: 'Fleksibilitas pengiriman dari bandara atau langsung ke alamat tujuan',
        },
        {
          name: 'Ground Handling',
          description: 'Layanan penanganan kargo di bandara dengan tim profesional',
        },
      ],
    },
  };

  const { t } = useLanguage();
  const tabs = [
    { id: 'darat', label: t('tab_darat'), icon: Truck },
    { id: 'laut', label: t('tab_laut'), icon: Ship },
    { id: 'udara', label: t('tab_udara'), icon: Plane },
  ];

  const currentService = services[activeTab as keyof typeof services];
  const ServiceIcon = currentService.icon;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-4">
            {t('services_title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t('services_subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#002147] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TabIcon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="flex items-center mb-8">
            <div className="bg-sky-500 p-4 rounded-xl mr-4">
              <ServiceIcon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#002147]">{currentService.title}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentService.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-sky-400 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sky-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#002147] text-lg mb-2">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            {t('need_info')}
          </p>
          <a
            href="https://wa.me/6282156785580"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('contact_now')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
