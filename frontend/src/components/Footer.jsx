import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export const Footer = () => {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 bg-[#08090c] pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-display text-3xl sm:text-4xl tracking-[0.35em] text-white mb-6">
              ARXEON
            </div>
            <p className="font-display italic text-xl text-[#d4af37] mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-white/40 max-w-md leading-relaxed">
              {lang === "it"
                ? "AI Factory · Architettura d'impresa autonoma. Precisione svizzera, esecuzione costante."
                : "Usine IA · Architecture d'entreprise autonome. Précision suisse, exécution constante."}
            </p>
          </div>

          <div className="col-span-6 lg:col-span-2 lg:col-start-8">
            <h4 className="overline text-white/40 mb-6">
              {t.footer.sections.product}
            </h4>
            <ul className="space-y-3">
              {t.footer.products.map((p) => (
                <li key={p}>
                  <a
                    href="#value"
                    data-testid={`footer-product-${p.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-sm text-white/65 hover:text-[#d4af37] transition-colors"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <h4 className="overline text-white/40 mb-6">
              {t.footer.sections.company}
            </h4>
            <ul className="space-y-3">
              {t.footer.company.map((c, i) => (
                <li key={c}>
                  <a
                    href={["#architecture", "#strategy", "#contact"][i]}
                    data-testid={`footer-company-${c.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-sm text-white/65 hover:text-[#d4af37] transition-colors"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline-gold opacity-50 mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/35 font-mono-arx tracking-wider">
            © {year} ARXEON · {t.footer.rights}
          </p>
          <p className="text-xs text-white/35 font-mono-arx tracking-[0.2em] uppercase">
            Made with precision · CH / IT / FR
          </p>
        </div>
      </div>
    </footer>
  );
};
