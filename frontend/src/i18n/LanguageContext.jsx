import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext({
  lang: "it",
  setLang: () => {},
  t: translations.it,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "it";
    const stored = window.localStorage.getItem("arxeon_lang");
    return stored === "fr" || stored === "it" ? stored : "it";
  });

  const setLang = (next) => {
    if (next !== "it" && next !== "fr") return;
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("arxeon_lang", next);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
