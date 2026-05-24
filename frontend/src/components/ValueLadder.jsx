import React from "react";
import { motion } from "framer-motion";
import { Cpu, UserCog, Building2, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ICONS = [Cpu, UserCog, Building2];

export const ValueLadder = () => {
  const { t } = useLanguage();

  return (
    <section
      id="value"
      data-testid="value-ladder-section"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">
                {t.valueLadder.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {t.valueLadder.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {t.valueLadder.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {t.valueLadder.tiers.map((tier, i) => {
            const Icon = ICONS[i] || Cpu;
            const isHighlight = i === 2;
            return (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`tier-card-${i}`}
                className={`relative p-8 sm:p-10 lg:p-12 transition-all duration-500 group ${
                  isHighlight
                    ? "bg-[#0d0f13] hover:bg-[#14161b]"
                    : "bg-[#0a0b0e] hover:bg-[#111317]"
                }`}
              >
                {isHighlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#d4af37]" />
                )}

                <div className="flex items-center justify-between mb-10">
                  <span
                    data-testid={`tier-badge-${i}`}
                    className="tier-badge"
                  >
                    · {tier.tag}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1}
                    className={
                      isHighlight ? "text-[#d4af37]" : "text-white/40"
                    }
                  />
                </div>

                <h3
                  data-testid={`tier-name-${i}`}
                  className="font-display text-3xl sm:text-4xl text-white mb-2"
                >
                  {tier.name}
                </h3>
                <p className="font-display italic text-[#d4af37] text-lg mb-8">
                  {tier.tagline}
                </p>

                <div className="hairline-gold mb-8 opacity-40" />

                <p className="text-white/65 leading-relaxed mb-10">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-12">
                  {tier.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-white/70"
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
                  data-testid={`tier-cta-${i}`}
                  className="inline-flex items-center gap-3 overline text-white group-hover:text-[#d4af37] transition-colors"
                >
                  {t.nav.cta}
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
