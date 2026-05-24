import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/02fe3f37-2b7f-4045-9133-890cdb832754/images/3dfa838e50be1b984b456fa2963189d198f52cfe4f53d06b05b4edf8f1d9cc37.png";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0b0e]/40 via-[#0a0b0e]/70 to-[#0a0b0e]" />
      <div className="absolute inset-0 -z-10 bg-[#0a0b0e]/30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-9"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="block w-12 h-px bg-[#d4af37]" />
              <span
                data-testid="hero-overline"
                className="overline text-[#d4af37]"
              >
                {t.hero.overline}
              </span>
            </div>

            <h1
              data-testid="hero-title"
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] text-white max-w-5xl"
            >
              {t.hero.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word === "sola." || word === "seule." ? (
                    <em className="font-display italic text-[#d4af37]">
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              data-testid="hero-subtitle"
              className="mt-10 max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed tracking-wide"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="btn-gold"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#architecture"
                data-testid="hero-cta-secondary"
                className="btn-ghost"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-24 sm:mt-32 grid grid-cols-2 sm:grid-cols-4 border-t border-white/5"
          data-testid="hero-meta-strip"
        >
          {t.hero.meta.map((m, i) => (
            <div
              key={i}
              className={`py-8 px-6 ${
                i !== 0 ? "sm:border-l border-white/5" : ""
              } ${i % 2 !== 0 ? "border-l sm:border-l" : ""}`}
            >
              <div className="font-display text-4xl sm:text-5xl text-[#d4af37] font-light">
                {m.k}
              </div>
              <div className="overline text-white/50 mt-2">{m.v}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#value"
            data-testid="hero-scroll-cue"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Scroll down"
          >
            <span className="overline">Scroll</span>
            <ChevronDown size={16} strokeWidth={1} className="animate-pulse" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
