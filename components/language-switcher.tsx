'use client';

import { useLanguage } from '@/providers/language-provider';

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang('id')}
        className={`px-3 py-1 rounded transition-colors ${
          lang === 'id'
            ? 'bg-white text-sky-600 font-semibold'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded transition-colors ${
          lang === 'en'
            ? 'bg-white text-sky-600 font-semibold'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
