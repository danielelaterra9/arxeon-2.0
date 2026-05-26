import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const Footer = () => {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const companyAnchors = ["#architecture", "#blueprint", "#strategy", "#contact"];

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 bg-[#08090c] pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="font-display text-3xl sm:text-4xl tracking-[0.35em] text-white">
                ARXEON
              </div>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#0a0b0e] bg-[#d4af37] px-2 py-1 leading-none">
                {t.nav.eliteBadge}
              </span>
            </div>
            <p className="font-display italic text-xl text-[#d4af37] mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-white/40 max-w-md leading-relaxed mb-8">
              {lang === "it"
                ? "AI Factory · Lo scudo operativo che assorbe la complessità e libera il team per il valore strategico."
                : "Usine IA · Le bouclier opérationnel qui absorbe la complexité et libère l'équipe pour la valeur stratégique."}
            </p>
            <a
              href="https://arxeon.ch"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-main-site-link"
              className="inline-flex items-center gap-2 overline text-[#d4af37] hover:text-[#e6c981] transition-colors"
            >
              {t.footer.mainSite}
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
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

          <div className="col-span-6 lg:col-span-3">
            <h4 className="overline text-white/40 mb-6">
              {t.footer.sections.company}
            </h4>
            <ul className="space-y-3">
              {t.footer.company.map((c, i) => (
                <li key={c}>
                  <a
                    href={companyAnchors[i] || "#contact"}
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
            B2B · IT / FR · Arxeon Elite
          </p>
        </div>
      </div>
    </footer>
  );
};
