import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#value", label: t.nav.valore },
    { href: "#architecture", label: t.nav.architettura },
    { href: "#pillars", label: t.nav.pilastri },
    { href: "#blueprint", label: t.nav.blueprint },
    { href: "#strategy", label: t.nav.strategia },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0a0b0e]/75 border-b border-white/5"
    >
      {/* Sub-bar: back to arxeon.ch */}
      <div className="border-b border-white/5 bg-[#08090c]/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-8 flex items-center justify-between text-[0.65rem] font-mono-arx text-white/45 tracking-[0.2em] uppercase">
          <a
            href="https://arxeon.ch"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="back-to-main-site"
            className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
          >
            ← {t.nav.backToMain}
          </a>
          <span className="hidden sm:inline text-white/35">
            {lang === "it"
              ? "B2B · Riservato · Su selezione"
              : "B2B · Confidentiel · Sur sélection"}
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-wordmark"
          className="flex items-center gap-3"
        >
          <span className="font-display text-xl sm:text-2xl tracking-[0.35em] text-white">
            ARXEON
          </span>
          <span
            data-testid="elite-badge"
            className="hidden sm:inline-block text-[0.6rem] uppercase tracking-[0.3em] text-[#0a0b0e] bg-[#d4af37] px-2 py-1 leading-none"
          >
            {t.nav.eliteBadge}
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-8">
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

        <div className="flex items-center gap-5">
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
            className="!hidden sm:!inline-flex btn-ghost"
          >
            {t.nav.cta}
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>

          <button
            type="button"
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="xl:hidden text-white/80 hover:text-[#d4af37] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="xl:hidden border-t border-white/5 bg-[#0a0b0e]/95 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                data-testid={`mobile-nav-${l.href.replace("#", "")}`}
                className="overline text-white/80 hover:text-[#d4af37] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMobile}
              className="btn-gold mt-4 self-start"
              data-testid="mobile-cta"
            >
              {t.nav.cta}
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
