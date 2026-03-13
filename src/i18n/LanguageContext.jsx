import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import en from './translations/en';
import de from './translations/de';

const translations = { en, de };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('annas-ultrasound-language') || 'en';
    } catch {
      return 'en';
    }
  });

  const switchLanguage = useCallback((lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem('annas-ultrasound-language', lang);
    } catch (e) {
      console.error('Error saving language preference:', e);
    }
  }, []);

  const t = useMemo(() => translations[language] || translations.en, [language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
