import heroImage from '../assets/hero.jpeg';
import heroImage2 from '../assets/hero-1.jpeg';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ids = window.setInterval(() => {
      setCurrent((c) => (c + 1) % 2);
    }, 5000);
    return () => window.clearInterval(ids);
  }, []);

  // Typewriter headline
  const { t } = useLanguage();
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    const full = t('hero_heading');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 80);
    return () => window.clearInterval(id);
  }, [t]);
  return (
    <section id="home" className="relative bg-white">
      {/* Background hero image slider (responsive heights + focal point) */}
      <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] overflow-hidden">
        {[heroImage, heroImage2].map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover transition-opacity duration-1000 ease-in-out bg-[position:50%_30%] sm:bg-[position:50%_40%] lg:bg-[position:50%_50%]`}
            style={{ backgroundImage: `url(${img})`, opacity: i === current ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Card overlapping the image */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl border-2 border-sky-300 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            <div className="md:w-1/2 p-10 md:p-14">
              <h2 className="text-5xl font-extrabold text-sky-500 tracking-tight headline-entrance">
                <span dangerouslySetInnerHTML={{ __html: displayed.replace(/\n/g, '<br/>') }} />
                <span className="typewriter-cursor" aria-hidden />
              </h2>
              <p className="text-slate-600 mt-6">{t('hero_subtitle')}</p>
            </div>

            <div className="md:w-1/2 p-8 md:p-14 border-t md:border-l-2 border-sky-100 bg-white">
              <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-slate-500">{t('phone')}</div>
                      <div className="text-sky-600 font-semibold">082156785580</div>

                      <div className="mt-4 text-sm text-slate-500">{t('email')}</div>
                      <div className="text-sky-600 font-semibold">fajarnusantaralogistik@gmail.com</div>
                </div>

                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-sky-400 rounded-lg flex items-center justify-center text-white">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="6" height="10" rx="1" stroke="white" strokeWidth="1.2"/><rect x="11" y="4" width="6" height="13" rx="1" stroke="white" strokeWidth="1.2"/></svg>
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

export default Hero;
