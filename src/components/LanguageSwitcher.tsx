import { Globe } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  const toggle = () => setLang(lang === 'id' ? 'en' : 'id');

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition text-white"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{lang === 'id' ? 'ID' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
