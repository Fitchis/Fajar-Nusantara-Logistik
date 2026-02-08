'use client';

import { Eye, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';

const CompanyOverview = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#1aa0c8] leading-tight">{t('who_are_we')}</h2>
              <p className="mt-6 text-gray-700 text-lg max-w-3xl">{t('overview_paragraph')}</p>

              <div className="mt-6 grid sm:grid-cols-3 gap-4 max-w-xl">
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-[#002147] mt-2 mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#002147]">{t('experience_title')}</h4>
                    <p className="text-sm text-gray-600">{t('experience_text')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#002147]">{t('armada_title')}</h4>
                    <p className="text-sm text-gray-600">{t('armada_text')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#002147]">{t('solusi_title')}</h4>
                    <p className="text-sm text-gray-600">{t('solusi_text')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img src="/placeholder.svg?height=400&width=300" alt="Team" className="w-full h-64 object-cover md:h-80 lg:h-96" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#002147] to-[#003366] p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-4">
              <div className="bg-sky-400 p-3 rounded-lg mr-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('vision_title')}</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">{t('vision_text')}</p>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-4">
              <div className="bg-white p-3 rounded-lg mr-4">
                <Target className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('mission_title')}</h3>
            </div>
            <ul className="text-white space-y-2 leading-relaxed">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('mission_point_1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('mission_point_2')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('mission_point_3')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('mission_point_4')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-extrabold text-[#1aa0c8] mb-4">{t('our_uniform_title')}</h3>
                <p className="text-gray-700 mb-4">{t('uniform_paragraph')}</p>
              </div>

              <div className="relative w-full">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/placeholder.svg?height=400&width=300" alt="Uniform examples" className="w-full h-72 md:h-96 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
