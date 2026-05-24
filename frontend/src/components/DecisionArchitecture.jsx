import React from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Megaphone,
  TrendingUp,
  Settings2,
  Wallet,
  Heart,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const DIRIGENTI_ICONS = [Megaphone, TrendingUp, Settings2, Wallet, Heart];

// Position 5 dirigenti around the CEO node. Angles in degrees from top, clockwise.
const ORBIT_POSITIONS = [
  { angle: -90, label: "top" },
  { angle: -18, label: "top-right" },
  { angle: 54, label: "bottom-right" },
  { angle: 126, label: "bottom-left" },
  { angle: 198, label: "top-left" },
];

const polarToCartesian = (angleDeg, radiusPct) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + radiusPct * Math.cos(rad),
    y: 50 + radiusPct * Math.sin(rad),
  };
};

export const DecisionArchitecture = () => {
  const { t } = useLanguage();

  return (
    <section
      id="architecture"
      data-testid="architecture-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#0a0b0e]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left: copy */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">
                {t.architecture.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {t.architecture.title}
            </h2>
            <p className="mt-8 text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
              {t.architecture.subtitle}
            </p>

            <div className="mt-12 space-y-4">
              {t.architecture.dirigenti.map((d, i) => {
                const Icon = DIRIGENTI_ICONS[i];
                return (
                  <motion.div
                    key={d.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    data-testid={`dirigente-row-${i}`}
                    className="flex items-center gap-4 py-3 border-b border-white/5"
                  >
                    <span className="font-mono-arx text-xs text-[#d4af37]/70 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      size={18}
                      strokeWidth={1.25}
                      className="text-[#d4af37]"
                    />
                    <span className="text-white/80 font-light tracking-wide">
                      {d.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: constellation */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="constellation"
              data-testid="constellation"
            >
              {/* Outer dashed ring */}
              <div className="orbit-ring" />
              <div
                className="orbit-ring"
                style={{ inset: "20%", borderStyle: "solid", opacity: 0.4 }}
              />

              {/* SVG connectors */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {ORBIT_POSITIONS.map((pos, i) => {
                  const { x, y } = polarToCartesian(pos.angle, 38);
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="rgba(212,175,55,0.25)"
                      strokeWidth="0.2"
                      strokeDasharray="0.6 0.8"
                    />
                  );
                })}
              </svg>

              {/* Center CEO node */}
              <div className="center-node">
                <div className="text-center">
                  <Crown
                    size={26}
                    strokeWidth={1.25}
                    className="text-[#d4af37] mx-auto"
                  />
                  <div className="font-display text-2xl text-white mt-2">
                    {t.architecture.center}
                  </div>
                  <div className="overline text-white/40 mt-1 text-[0.6rem]">
                    {t.architecture.centerSub}
                  </div>
                </div>
              </div>

              {/* Orbit nodes */}
              {ORBIT_POSITIONS.map((pos, i) => {
                const { x, y } = polarToCartesian(pos.angle, 42);
                const d = t.architecture.dirigenti[i];
                const Icon = DIRIGENTI_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    data-testid={`orbit-node-${i}`}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111317] border border-[#d4af37]/40 flex items-center justify-center hover:border-[#d4af37] transition-colors">
                        <Icon
                          size={22}
                          strokeWidth={1.25}
                          className="text-[#d4af37]"
                        />
                      </div>
                      <div className="mt-3 overline text-white/70 text-[0.6rem] sm:text-xs whitespace-nowrap">
                        {d.short}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
