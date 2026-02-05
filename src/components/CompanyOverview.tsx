import { Eye, Target, Users } from 'lucide-react';
import { useState } from 'react';
import TeamImg from '../assets/kapal/5.jpeg';
import Team from '../assets/About/Team.jpeg';
import UniformImg from '../assets/About/uniform.jpeg';
import useLanguage from '../context/useLanguage';

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
              <div className="absolute inset-y-0 right-0 w-20 rounded-l-3xl hidden md:block" aria-hidden="true" />

              <div className="relative ml-0 md:ml-6">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img src={Team} alt="Fajar Nusantara Logistik team" className="w-full h-64 object-cover md:h-80 lg:h-96" />
                </div>
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

        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${TeamImg})` }}
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/40" aria-hidden="true" />

          <div className="relative z-10 p-6 md:p-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-[#002147] p-3 rounded-lg mr-4">
                  <Users className="h-8 w-8 text-sky-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">{t('structure_title')}</h3>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-sky-400 to-sky-600 text-white rounded-2xl px-6 py-4 shadow-2xl transform hover:scale-[1.02] transition">
                  <div className="text-center font-semibold">{t('director_name')}</div>
                  <div className="text-xs opacity-90">{t('director_title')}</div>
                </div>
              </div>

              <div className="mt-6 flex justify-center" aria-hidden>
                <svg className="w-3/4 h-6" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 6 L25 6 C35 6 35 0 50 0 C65 0 65 6 75 6 L100 6" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />
                </svg>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
                    <div className="font-semibold">Nur Fadhilah</div>
                    <div className="text-xs opacity-90">Finance & Adm Head</div>
                  </div>

                  <svg className="mt-3 h-6" viewBox="0 0 20 40" width="20" height="40" aria-hidden>
                    <path d="M10 0 V30" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                    <path d="M10 30 C10 34, 6 36, 4 38" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
                  </svg>

                  <div className="mt-4 flex flex-col gap-3 items-center">
                    <div className="bg-sky-500 text-white rounded-lg px-3 py-2 text-sm">Nadiya<span className="block text-xs font-normal">Finance & Adm</span></div>
                    <div className="bg-sky-500 text-white rounded-lg px-3 py-2 text-sm">Mariska<span className="block text-xs font-normal">Accounting & Tax</span></div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
                    <div className="font-semibold">Sarif Hidayat</div>
                    <div className="text-xs opacity-90">Operation Dept Head</div>
                  </div>

                  <svg className="mt-3 h-6" viewBox="0 0 20 40" width="20" height="40" aria-hidden>
                    <path d="M10 0 V30" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  </svg>

                  <div className="mt-4 flex flex-col gap-3 items-center">
                    <div className="bg-sky-500 text-white rounded-lg px-3 py-2 text-sm">Reza<span className="block text-xs font-normal">SPV Operation</span></div>
                    <div className="bg-sky-500 text-white rounded-lg px-3 py-2 text-sm">Rayhan<span className="block text-xs font-normal">Staff Operation</span></div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
                    <div className="font-semibold">Herlina Bahar</div>
                    <div className="text-xs opacity-90">Sales & Marketing Head</div>
                  </div>

                  <svg className="mt-3 h-6" viewBox="0 0 20 40" width="20" height="40" aria-hidden>
                    <path d="M10 0 V20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  </svg>

                  <div className="mt-4 flex flex-col gap-3 items-center">
                    <div className="bg-sky-500 text-white rounded-lg px-3 py-2 text-sm">Anty<span className="block text-xs font-normal">Marketing & Promotion</span></div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
                    <div className="font-semibold">Bisdev / HC</div>
                    <div className="text-xs opacity-90">Analyst</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Uniform / Our Uniform section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-extrabold text-[#1aa0c8] mb-4">{t('our_uniform_title')}</h3>
                <p className="text-gray-700 mb-4">{t('uniform_paragraph')}</p>

                <div className="space-y-3">
                  <button className="text-left w-full p-3 rounded-lg hover:bg-sky-50" onClick={() => setActiveHotspot('outdoor')}>
                    <span className="font-semibold">{t('hotspot_outdoor_title')}</span>
                    <div className="text-sm text-gray-600">{t('hotspot_outdoor_text')}</div>
                  </button>

                  <button className="text-left w-full p-3 rounded-lg hover:bg-sky-50" onClick={() => setActiveHotspot('navy')}>
                    <span className="font-semibold">{t('hotspot_navy_title')}</span>
                    <div className="text-sm text-gray-600">{t('hotspot_navy_text')}</div>
                  </button>

                  <button className="text-left w-full p-3 rounded-lg hover:bg-sky-50" onClick={() => setActiveHotspot('white')}>
                    <span className="font-semibold">{t('hotspot_white_title')}</span>
                    <div className="text-sm text-gray-600">{t('hotspot_white_text')}</div>
                  </button>
                </div>
              </div>

              <div className="relative w-full">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={UniformImg} alt="Uniform examples" className="w-full h-72 md:h-96 object-cover" />
                </div>

                {/* Hotspots - absolute positioned markers */}
                <button
                  onMouseEnter={() => setActiveHotspot('outdoor')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot('outdoor')}
                  className="absolute left-6 top-12 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md ring-2 ring-sky-500"
                  aria-label="Outdoor dresscode"
                >
                  <span className="text-sky-600 font-bold">1</span>
                </button>

                <button
                  onMouseEnter={() => setActiveHotspot('navy')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot('navy')}
                  className="absolute left-24 top-48 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md ring-2 ring-sky-500"
                  aria-label="Navy uniform"
                >
                  <span className="text-sky-600 font-bold">2</span>
                </button>

                <button
                  onMouseEnter={() => setActiveHotspot('white')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot('white')}
                  className="absolute right-8 top-20 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md ring-2 ring-sky-500"
                  aria-label="White uniform"
                >
                  <span className="text-sky-600 font-bold">3</span>
                </button>

                {/* Tooltip / info panel */}
                <div className="absolute left-0 right-0 bottom-0 flex justify-center pointer-events-none">
                  <div className="pointer-events-auto bg-white/90 text-gray-800 rounded-xl px-4 py-2 shadow-md m-4 max-w-md">
                    {activeHotspot === 'outdoor' && (
                      <div>
                        <div className="font-semibold">{t('hotspot_outdoor_title')}</div>
                        <div className="text-sm">{t('hotspot_outdoor_text')}</div>
                      </div>
                    )}
                    {activeHotspot === 'navy' && (
                      <div>
                        <div className="font-semibold">{t('hotspot_navy_title')}</div>
                        <div className="text-sm">{t('hotspot_navy_text')}</div>
                      </div>
                    )}
                    {activeHotspot === 'white' && (
                      <div>
                        <div className="font-semibold">{t('hotspot_white_title')}</div>
                        <div className="text-sm">{t('hotspot_white_text')}</div>
                      </div>
                    )}
                    {activeHotspot === null && <div className="text-sm text-gray-600">{t('hover_or_click')}</div>}
                  </div>
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