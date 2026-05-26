import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const formatCHF = (n) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(n);

export const ZanePricing = () => {
  const { t } = useLanguage();
  const z = t.zanePricing;

  return (
    <section
      id="zane-pricing"
      data-testid="zane-pricing-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#08090c]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">{z.overline}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {z.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {z.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {z.plans.map((plan, i) => {
            const isHighlight = !!plan.highlight;
            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`zane-plan-${i}`}
                className={`relative p-8 sm:p-10 lg:p-12 flex flex-col group transition-all duration-500 ${
                  isHighlight
                    ? "bg-gradient-to-br from-[#14110a] via-[#0d0f13] to-[#0a0b0e]"
                    : "bg-[#0a0b0e] hover:bg-[#0d0f13]"
                }`}
              >
                {isHighlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#d4af37]" />
                )}

                {plan.highlight && (
                  <span
                    data-testid={`zane-plan-highlight-${i}`}
                    className="absolute top-6 right-6 inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.25em] bg-[#d4af37] text-[#0a0b0e] px-2.5 py-1 font-medium"
                  >
                    <Sparkles size={10} strokeWidth={2} />
                    {plan.highlight}
                  </span>
                )}

                <div className="mb-8">
                  <h3
                    data-testid={`zane-plan-name-${i}`}
                    className="font-display text-3xl sm:text-4xl text-white mb-2 leading-tight"
                  >
                    {plan.name}
                  </h3>
                  <p className="font-display italic text-base text-[#d4af37] mb-4 leading-snug">
                    {plan.tagline}
                  </p>
                  <p className="overline text-white/45 text-[0.6rem]">
                    {plan.target}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-5xl sm:text-6xl text-white font-light leading-none">
                      {formatCHF(plan.monthly)}
                    </span>
                    <span className="font-mono-arx text-sm text-white/55">
                      {z.currency}
                      {z.monthlyLabel}
                    </span>
                  </div>
                  <div className="font-mono-arx text-xs text-white/50 tracking-wider">
                    {z.setupLabel} {z.currency} {formatCHF(plan.setup)}
                  </div>
                </div>

                <div className="hairline-gold opacity-40 mb-8" />

                <p className="text-sm text-white/65 leading-relaxed mb-8">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-white/75"
                    >
                      <Check
                        size={14}
                        strokeWidth={1.5}
                        className="mt-1 text-[#d4af37] shrink-0"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  data-testid={`zane-plan-cta-${i}`}
                  className={`inline-flex items-center justify-center gap-3 w-full px-6 py-4 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 ${
                    isHighlight
                      ? "bg-[#d4af37] text-[#0a0b0e] hover:bg-[#e6c981]"
                      : "border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0b0e]"
                  }`}
                >
                  {z.cta}
                  <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </motion.article>
            );
          })}
        </div>

        <p
          data-testid="zane-pricing-footnote"
          className="mt-10 text-xs text-white/40 max-w-3xl leading-relaxed font-mono-arx tracking-wide"
        >
          {z.footnote}
        </p>
      </div>
    </section>
  );
};
