import React from "react";
import { motion } from "framer-motion";
import { Cpu, UserCog, Building2, ArrowRight, Check, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const FEATURED_ICONS = [Cpu, UserCog];

export const ValueLadder = () => {
  const { t } = useLanguage();
  const v = t.valueLadder;

  return (
    <section
      id="value"
      data-testid="value-ladder-section"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section intro */}
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-20">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">{v.overline}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {v.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {v.subtitle}
            </p>
          </div>
        </div>

        {/* Featured overline */}
        <div className="flex items-center gap-3 mb-8">
          <Sparkles size={14} strokeWidth={1.5} className="text-[#d4af37]" />
          <span className="overline text-[#d4af37]/85">
            {v.featuredOverline}
          </span>
          <span className="block flex-1 h-px bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
        </div>

        {/* TWO FEATURED TIERS — large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 mb-px">
          {v.tiers.map((tier, i) => {
            const Icon = FEATURED_ICONS[i] || Cpu;
            const isZane = i === 1;
            return (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`tier-card-${i}`}
                className={`relative p-10 sm:p-12 lg:p-14 group transition-all duration-500 ${
                  isZane
                    ? "bg-gradient-to-br from-[#14110a] via-[#0d0f13] to-[#0a0b0e] hover:from-[#1a1610]"
                    : "bg-[#0d0f13] hover:bg-[#14161b]"
                }`}
              >
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

                {/* Header row */}
                <div className="flex items-start justify-between mb-12">
                  <div>
                    <span
                      data-testid={`tier-badge-${i}`}
                      className="tier-badge block mb-3"
                    >
                      · {tier.tag}
                    </span>
                    {tier.highlight && (
                      <span
                        data-testid={`tier-highlight-${i}`}
                        className="inline-block text-[0.6rem] uppercase tracking-[0.25em] bg-[#d4af37] text-[#0a0b0e] px-2.5 py-1 font-medium"
                      >
                        ★ {tier.highlight}
                      </span>
                    )}
                  </div>
                  <Icon
                    size={32}
                    strokeWidth={1}
                    className="text-[#d4af37] transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Name + tagline */}
                <h3
                  data-testid={`tier-name-${i}`}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-3 leading-[1.05]"
                >
                  {tier.name}
                </h3>
                <p className="font-display italic text-xl sm:text-2xl text-[#d4af37] mb-10 leading-snug">
                  {tier.tagline}
                </p>

                <div className="hairline-gold opacity-40 mb-10" />

                <p className="text-base text-white/70 leading-relaxed mb-10 max-w-md">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-12">
                  {tier.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-white/80"
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
                  href={isZane ? "#zane-pricing" : "#roi-calculator"}
                  data-testid={`tier-cta-${i}`}
                  className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-sm uppercase tracking-[0.12em] font-medium transition-all duration-300 ${
                    isZane
                      ? "bg-[#d4af37] text-[#0a0b0e] hover:bg-[#e6c981]"
                      : "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0b0e]"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={16} strokeWidth={1.5} />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* PREMIUM TIER — Elite banner */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-[#d4af37]/60" />
            <span className="overline text-white/45">
              {v.premiumOverline}
            </span>
            <span className="block flex-1 h-px bg-white/5" />
          </div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            data-testid="tier-card-premium"
            className="relative bg-[#0a0b0e] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Left column: branding */}
            <div className="lg:col-span-5 p-10 sm:p-12 lg:p-14 lg:border-r border-b lg:border-b-0 border-white/5 relative overflow-hidden">
              {/* Subtle gold radial bg */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 0% 100%, rgba(212,175,55,0.18) 0%, transparent 50%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 size={26} strokeWidth={1} className="text-[#d4af37]" />
                  <span className="tier-badge">· {v.premium.tag}</span>
                </div>
                <h3
                  data-testid="tier-premium-name"
                  className="font-display text-4xl sm:text-5xl text-white mb-3 leading-[1.05]"
                >
                  {v.premium.name}
                </h3>
                <p className="font-display italic text-xl text-[#d4af37] leading-snug">
                  {v.premium.tagline}
                </p>
              </div>
            </div>

            {/* Right column: description + features + CTA */}
            <div className="lg:col-span-7 p-10 sm:p-12 lg:p-14">
              <p className="text-base text-white/70 leading-relaxed mb-10">
                {v.premium.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-12">
                {v.premium.features.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <span className="font-mono-arx text-[0.65rem] text-[#d4af37]/60 mt-1 w-6">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#architecture"
                data-testid="tier-premium-cta"
                className="inline-flex items-center gap-3 overline text-[#d4af37] underline-reveal"
              >
                {v.premium.cta}
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
