import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'fr' as const, label: 'FR' },
    { code: 'nl' as const, label: 'NL' },
    { code: 'en' as const, label: 'EN' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
            language === lang.code
              ? 'bg-primary text-white shadow-lg'
              : 'text-white hover:bg-white/20'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
