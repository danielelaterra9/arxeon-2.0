import React from "react";
import { motion } from "framer-motion";
import {
  Inbox,
  Network,
  Boxes,
  ArrowDown,
  Cpu,
  Database,
  Shield,
  Server,
  Activity,
  Lock,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const LAYER_ICONS = [Inbox, Network, Boxes];

const STACK_ICONS = [Cpu, Database, Network, Activity, Server, Lock];

const StatusDot = () => (
  <span className="inline-flex items-center gap-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
    </span>
  </span>
);

export const TechnicalBlueprint = () => {
  const { t } = useLanguage();
  const b = t.blueprint;

  return (
    <section
      id="blueprint"
      data-testid="blueprint-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#08090c] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">{b.overline}</span>
              <StatusDot />
              <span className="overline text-white/40">LIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {b.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {b.subtitle}
            </p>
          </div>
        </div>

        {/* Layers stack — vertical pipeline */}
        <div className="relative">
          <div className="space-y-px bg-white/5">
            {b.layers.map((layer, i) => {
              const Icon = LAYER_ICONS[i] || Inbox;
              return (
                <motion.div
                  key={layer.k}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  data-testid={`blueprint-layer-${i}`}
                  className="bg-[#0a0b0e] grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:bg-[#0d0f13] transition-colors duration-500"
                >
                  {/* Layer header column */}
                  <div className="lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 relative">
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-mono-arx text-xs text-[#d4af37] tracking-[0.2em]">
                        · LAYER {layer.k}
                      </span>
                      <Icon
                        size={28}
                        strokeWidth={1.1}
                        className="text-[#d4af37]"
                      />
                    </div>
                    <h3
                      data-testid={`blueprint-layer-name-${i}`}
                      className="font-display text-2xl sm:text-3xl text-white mb-3 leading-snug"
                    >
                      {layer.name}
                    </h3>
                    <p className="font-display italic text-base text-[#d4af37]/85 mb-6">
                      {layer.subtitle}
                    </p>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>

                  {/* Nodes column */}
                  <div className="lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className="overline text-white/40 mb-6">Componenti</div>
                    <ul className="space-y-3">
                      {layer.nodes.map((node, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm text-white/75 font-mono-arx tracking-wide"
                        >
                          <span className="font-mono-arx text-[0.65rem] text-[#d4af37]/60 w-10">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="h-px w-3 bg-[#d4af37]/40" />
                          <span className="font-sans">{node}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats column */}
                  <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center gap-6">
                    {layer.stats.map((s, idx) => (
                      <div
                        key={idx}
                        data-testid={`blueprint-stat-${i}-${idx}`}
                      >
                        <div className="font-display text-4xl sm:text-5xl text-[#d4af37] font-light leading-none mb-2">
                          {s.v}
                        </div>
                        <div className="overline text-white/45 text-[0.6rem]">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Down-arrow connectors between layers */}
          <div
            aria-hidden="true"
            className="hidden lg:flex absolute inset-0 pointer-events-none flex-col justify-around items-start"
            style={{ left: "16.66%" }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="text-[#d4af37]/40"
                style={{ position: "absolute", top: `${33 + i * 33}%`, transform: "translateY(-50%)" }}
              >
                <ArrowDown size={14} strokeWidth={1.2} />
              </div>
            ))}
          </div>
        </div>

        {/* Stack + Principle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 mt-px">
          <div className="lg:col-span-7 bg-[#0a0b0e] p-8 lg:p-12">
            <div className="overline text-[#d4af37] mb-8">{b.stackOverline}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
              {b.stack.map((item, i) => {
                const Icon = STACK_ICONS[i % STACK_ICONS.length];
                return (
                  <div
                    key={i}
                    data-testid={`blueprint-stack-${i}`}
                    className="flex items-center gap-4 py-3 border-b border-white/5"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.2}
                      className="text-[#d4af37] shrink-0"
                    />
                    <span className="text-sm text-white/75 font-mono-arx tracking-wide">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#14110a] to-[#0a0b0e] p-8 lg:p-12 flex flex-col justify-center">
            <div className="overline text-white/45 mb-6">
              {b.principle.overline}
            </div>
            <Shield
              size={32}
              strokeWidth={1}
              className="text-[#d4af37] mb-8"
            />
            <blockquote
              data-testid="blueprint-principle-quote"
              className="font-display text-2xl sm:text-3xl text-white leading-snug italic"
            >
              &ldquo;{b.principle.quote}&rdquo;
            </blockquote>
            <div className="hairline-gold opacity-50 mt-10" />
            <div className="mt-6 font-mono-arx text-xs text-white/45 tracking-[0.18em] uppercase">
              ARXEON · Engineering
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
