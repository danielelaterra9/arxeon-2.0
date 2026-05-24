import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const EliteIntro = () => {
  const { t } = useLanguage();
  const e = t.eliteIntro;

  return (
    <section
      data-testid="elite-intro-section"
      className="relative py-20 sm:py-24 lg:py-32 bg-[#0a0b0e] border-t border-b border-[#d4af37]/15"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">{e.overline}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-white mb-6">
              {e.title}
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
              {e.subtitle}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex lg:items-end lg:justify-end">
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="font-display text-7xl lg:text-8xl text-[#d4af37]/20 leading-none">
                2.0
              </div>
              <div className="flex items-center gap-2 overline text-[#d4af37]/70">
                <span>Scroll</span>
                <ChevronDown size={14} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
