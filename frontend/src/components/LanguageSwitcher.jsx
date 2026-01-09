import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' }
  ];

  const currentLang = i18n.language?.substring(0, 2) || 'fr';

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('arxeon-lang', langCode);
  };

  return (
    <div className="flex items-center gap-1">
      <Globe size={16} className="text-[#9a9a96] mr-1" />
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => handleLanguageChange(lang.code)}
            className={`text-sm font-medium transition-colors ${
              currentLang === lang.code
                ? 'text-[#c8f000]'
                : 'text-[#9a9a96] hover:text-white'
            }`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-[#343633]">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
