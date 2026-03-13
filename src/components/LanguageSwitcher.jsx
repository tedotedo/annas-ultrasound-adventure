import { useLanguage } from '../i18n';

function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="fixed top-3 right-3 z-50">
      <button
        onClick={() => switchLanguage(language === 'en' ? 'de' : 'en')}
        className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full
                   px-3 py-1.5 shadow-md hover:shadow-lg transition-all duration-300
                   hover:scale-105 active:scale-95 border border-gray-200/60
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
        aria-label={language === 'en' ? 'Auf Deutsch wechseln' : 'Switch to English'}
      >
        <span className="text-lg leading-none">{language === 'en' ? '🇩🇪' : '🇬🇧'}</span>
        <span className="text-xs font-semibold text-text-dark">
          {language === 'en' ? 'DE' : 'EN'}
        </span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
