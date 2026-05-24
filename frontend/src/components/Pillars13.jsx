import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  MessageSquareText,
  Settings,
  PieChart,
  Database,
  Magnet,
  PenTool,
  Users,
  Activity,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const PILLAR_ICONS = [
  TrendingUp,
  Target,
  MessageSquareText,
  Settings,
  PieChart,
  Database,
  Magnet,
  PenTool,
  Users,
  Activity,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
];

export const Pillars13 = () => {
  const { t } = useLanguage();

  return (
    <section
      id="pillars"
      data-testid="pillars-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#08090c]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-20">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">
                {t.pillars.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {t.pillars.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {t.pillars.subtitle}
            </p>
            <div className="mt-8 font-display text-7xl sm:text-8xl text-[#d4af37]/15 leading-none">
              13
            </div>
          </div>
        </div>

        {/* Dense bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {t.pillars.items.map((p, i) => {
            const Icon = PILLAR_ICONS[i] || Target;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`pillar-${i}`}
                className="pillar-tile group"
              >
                <span className="pillar-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  size={26}
                  strokeWidth={1.1}
                  className="text-[#d4af37] mb-6 transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-display text-xl text-white mb-2 leading-snug">
                  {p.name}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}

          {/* 14th cell — filler with gold accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            data-testid="pillar-end-card"
            className="pillar-tile relative overflow-hidden bg-gradient-to-br from-[#1a1610] to-[#0d0f13]"
          >
            <div className="font-display text-5xl text-[#d4af37] mb-4">∞</div>
            <div className="overline text-white/60 mb-2">Sistema Unico</div>
            <p className="text-sm text-white/50 leading-relaxed">
              Tutti i pilastri operano come un'unica intelligenza coordinata.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
