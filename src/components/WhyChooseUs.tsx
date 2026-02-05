import KapalImg from '../assets/kapal/kapal.jpeg';
import useLanguage from '../context/useLanguage';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-4">{t('why_choose_heading')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl">{t('why_choose_paragraph')}</p>

            <div className="mt-8 space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-sky-400 flex items-center justify-center text-white text-xl font-bold">1</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#002147]">{t('feature1_title')}</h4>
                  <p className="text-gray-600 mt-2 max-w-xl">{t('feature1_text')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-xl font-bold">2</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#002147]">{t('feature2_title')}</h4>
                  <p className="text-gray-600 mt-2 max-w-xl">{t('feature2_text')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-xl font-bold">3</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#002147]">{t('feature3_title')}</h4>
                  <p className="text-gray-600 mt-2 max-w-xl">{t('feature3_text')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <h5 className="font-semibold text-[#002147]">{t('reach_title')}</h5>
                  <p className="text-sm text-gray-600 mt-2">{t('reach_text')}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <h5 className="font-semibold text-[#002147]">{t('integrated_title')}</h5>
                  <p className="text-sm text-gray-600 mt-2">{t('integrated_text')}</p>
                </div>
              </div>

              <div className="mt-6">
                <a href="https://wa.me/6282156785580" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-sky-500 text-white rounded-full font-semibold shadow hover:bg-sky-600">{t('consult_button')}</a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src={KapalImg} alt="Kapal" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
