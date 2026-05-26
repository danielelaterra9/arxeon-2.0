import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

// Swiss market assumption: fully loaded hourly cost ~CHF 55
// Working days per year: 220 (standard Swiss / EU calc)
const CHF_PER_HOUR = 55;
const WORKING_DAYS_PER_YEAR = 220;
const HOURS_PER_FTE_YEAR = 1760; // 220 days × 8h

const formatCHF = (n) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(n);

const formatNumber = (n, digits = 0) =>
  new Intl.NumberFormat("de-CH", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);

export const SavingsCalculator = () => {
  const { t, lang } = useLanguage();
  const c = t.savingsCalculator;

  const [employees, setEmployees] = useState(8);
  const [hoursPerDay, setHoursPerDay] = useState(2);

  const { annualSavings, annualHours, fteEquivalent } = useMemo(() => {
    const safeEmp = Math.max(0, Number(employees) || 0);
    const safeHours = Math.max(0, Math.min(8, Number(hoursPerDay) || 0));
    const hours = safeEmp * safeHours * WORKING_DAYS_PER_YEAR;
    const savings = hours * CHF_PER_HOUR;
    const fte = hours / HOURS_PER_FTE_YEAR;
    return {
      annualSavings: savings,
      annualHours: hours,
      fteEquivalent: fte,
    };
  }, [employees, hoursPerDay]);

  const handleEmployees = (e) => {
    const v = e.target.value.replace(/[^\d]/g, "");
    setEmployees(v === "" ? "" : Math.min(10000, parseInt(v, 10)));
  };
  const handleHours = (e) => {
    const v = e.target.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const num = v === "" ? "" : Math.min(8, parseFloat(v) || 0);
    setHoursPerDay(num);
  };

  return (
    <section
      id="roi-calculator"
      data-testid="savings-calculator-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#0a0b0e] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <Calculator size={14} strokeWidth={1.5} className="text-[#d4af37]" />
              <span className="overline text-[#d4af37]">{c.overline}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {c.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-6">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {c.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-[#0d0f13] p-8 sm:p-10 lg:p-12">
            <div className="overline text-white/45 mb-8">
              {lang === "it" ? "Punto di partenza" : "Point de départ"}
            </div>

            <div className="space-y-10">
              <div>
                <label
                  htmlFor="emp-input"
                  className="overline text-white/55 block mb-3"
                >
                  {c.employeesLabel}
                </label>
                <input
                  id="emp-input"
                  type="text"
                  inputMode="numeric"
                  data-testid="calc-employees-input"
                  value={employees}
                  onChange={handleEmployees}
                  placeholder={c.employeesPlaceholder}
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#d4af37] outline-none transition-colors py-3 font-display text-4xl sm:text-5xl text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="hours-input"
                  className="overline text-white/55 block mb-3"
                >
                  {c.hoursLabel}
                </label>
                <input
                  id="hours-input"
                  type="text"
                  inputMode="decimal"
                  data-testid="calc-hours-input"
                  value={hoursPerDay}
                  onChange={handleHours}
                  placeholder={c.hoursPlaceholder}
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#d4af37] outline-none transition-colors py-3 font-display text-4xl sm:text-5xl text-white"
                />
                <div className="mt-2 font-mono-arx text-[0.65rem] text-white/40 tracking-wider">
                  {lang === "it" ? "Max 8 h/giorno" : "Max 8 h/jour"}
                </div>
              </div>
            </div>

            <div className="hairline-gold opacity-40 mt-12 mb-6" />
            <p className="text-xs text-white/45 leading-relaxed font-mono-arx">
              {c.assumption}
            </p>
          </div>

          {/* Result */}
          <motion.div
            key={annualSavings}
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-gradient-to-br from-[#14110a] via-[#0d0f13] to-[#0a0b0e] p-8 sm:p-10 lg:p-14 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={16} strokeWidth={1.5} className="text-[#d4af37]" />
              <span className="overline text-[#d4af37]">{c.resultLabel}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  data-testid="calc-annual-savings"
                  className="font-display text-6xl sm:text-7xl lg:text-8xl text-[#d4af37] font-light leading-none"
                >
                  {formatCHF(annualSavings)}
                </span>
                <span className="font-display text-2xl sm:text-3xl text-white/60">
                  {lang === "it" ? "CHF/anno" : "CHF/an"}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-md">
                {c.resultSubtitle}
              </p>
            </div>

            <div className="hairline-gold opacity-40 my-8" />

            <div className="grid grid-cols-2 gap-px bg-white/5 mb-10">
              <div className="bg-[#0a0b0e]/60 p-6">
                <div
                  data-testid="calc-hours-per-year"
                  className="font-display text-3xl sm:text-4xl text-white font-light leading-none mb-2"
                >
                  {formatNumber(annualHours)}
                </div>
                <div className="overline text-white/50 text-[0.6rem]">
                  {c.hoursPerYearLabel}
                </div>
              </div>
              <div className="bg-[#0a0b0e]/60 p-6">
                <div
                  data-testid="calc-fte-equivalent"
                  className="font-display text-3xl sm:text-4xl text-white font-light leading-none mb-2"
                >
                  {formatNumber(fteEquivalent, 1)}
                </div>
                <div className="overline text-white/50 text-[0.6rem]">
                  {c.fteLabel}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-white/40 leading-relaxed max-w-xl mb-6">
                {c.disclaimer}
              </p>
              <a
                href="#contact"
                data-testid="calc-cta"
                className="inline-flex items-center gap-3 bg-[#d4af37] text-[#0a0b0e] hover:bg-[#e6c981] px-8 py-4 text-xs uppercase tracking-[0.15em] font-medium transition-colors"
              >
                {c.cta}
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
