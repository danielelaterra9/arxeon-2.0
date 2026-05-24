import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

const STRATEGY_BG =
  "https://images.unsplash.com/photo-1768062251809-739d987a42fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMHdhdGNoJTIwbWVjaGFuaXNtJTIwbWFjcm98ZW58MHx8fHwxNzc5NjIwMDM1fDA&ixlib=rb-4.1.0&q=85";

export const Strategy = () => {
  const { t } = useLanguage();

  return (
    <section
      id="strategy"
      data-testid="strategy-section"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: `url(${STRATEGY_BG})`,
          backgroundPosition: "center right",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a0b0e] via-[#0a0b0e]/85 to-[#0a0b0e]/40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">
                {t.strategy.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {t.strategy.title}
            </h2>
            <p className="mt-8 max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed">
              {t.strategy.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {t.strategy.points.map((pt, i) => (
            <motion.div
              key={pt.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-testid={`strategy-point-${i}`}
              className="bg-[#0a0b0e]/80 backdrop-blur-sm p-10 lg:p-14 hover:bg-[#11141a]/80 transition-colors duration-500 group"
            >
              <div className="flex items-start gap-8">
                <div className="font-display text-6xl text-[#d4af37]/40 leading-none group-hover:text-[#d4af37] transition-colors duration-500">
                  {pt.k}
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
                    {pt.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
