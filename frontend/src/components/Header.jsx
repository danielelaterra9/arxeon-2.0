import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export const Header = () => {
  const { lang, setLang, t } = useLanguage();

  const links = [
    { href: "#architecture", label: t.nav.architettura },
    { href: "#value", label: t.nav.valore },
    { href: "#pillars", label: t.nav.pilastri },
    { href: "#strategy", label: t.nav.strategia },
  ];

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0a0b0e]/70 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-wordmark"
          className="font-display text-xl sm:text-2xl tracking-[0.35em] text-white"
        >
          ARXEON
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.replace("#", "")}`}
              className="overline text-white/70 hover:text-white underline-reveal"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div
            data-testid="language-switcher"
            className="flex items-center font-mono-arx text-xs text-white/50"
          >
            <button
              type="button"
              data-testid="lang-it"
              onClick={() => setLang("it")}
              className={`px-2 py-1 transition-colors ${
                lang === "it" ? "text-[#d4af37]" : "hover:text-white"
              }`}
              aria-pressed={lang === "it"}
            >
              IT
            </button>
            <span className="text-white/20">·</span>
            <button
              type="button"
              data-testid="lang-fr"
              onClick={() => setLang("fr")}
              className={`px-2 py-1 transition-colors ${
                lang === "fr" ? "text-[#d4af37]" : "hover:text-white"
              }`}
              aria-pressed={lang === "fr"}
            >
              FR
            </button>
          </div>

          <a
            href="#contact"
            data-testid="header-cta"
            className="hidden sm:inline-flex btn-ghost"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
};
