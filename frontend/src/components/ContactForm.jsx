import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = () => {
  const { t, lang } = useLanguage();

  const [form, setForm] = useState({
    company: "",
    email: "",
    phone: "",
    tier: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.company.trim()) next.company = t.cta.required;
    if (!form.email.trim()) next.email = t.cta.required;
    else if (!emailRegex.test(form.email)) next.email = t.cta.emailInvalid;
    if (!form.phone.trim()) next.phone = t.cta.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await axios.post(`${API}/consultation`, {
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        tier: form.tier || undefined,
        language: lang,
        message: form.message.trim() || undefined,
      });
      setStatus("success");
      setForm({ company: "", email: "", phone: "", tier: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(t.cta.error);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#08090c]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Left intro */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#d4af37]" />
              <span className="overline text-[#d4af37]">
                {t.cta.overline}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              {t.cta.title}
            </h2>
            <p className="mt-8 text-base sm:text-lg text-white/60 leading-relaxed">
              {t.cta.subtitle}
            </p>

            <div className="mt-12 space-y-6">
              {[
                { k: "45'", v: lang === "it" ? "Consultazione riservata" : "Consultation confidentielle" },
                { k: "24h", v: lang === "it" ? "Risposta garantita" : "Réponse garantie" },
                { k: "1:1", v: lang === "it" ? "Con il team Arxeon" : "Avec l'équipe Arxeon" },
              ].map((it, i) => (
                <div key={i} className="flex items-baseline gap-6 border-b border-white/5 pb-4">
                  <span className="font-display text-3xl text-[#d4af37]">{it.k}</span>
                  <span className="text-white/65">{it.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="col-span-12 lg:col-span-7">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                data-testid="form-success"
                className="bg-[#0d0f13] border border-[#d4af37]/30 p-10 lg:p-14"
              >
                <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center mb-8">
                  <Check size={20} strokeWidth={1.5} className="text-[#d4af37]" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white mb-4">
                  {t.cta.successTitle}
                </h3>
                <p className="text-white/65 leading-relaxed">
                  {t.cta.successBody}
                </p>
                <button
                  type="button"
                  data-testid="form-reset"
                  onClick={() => setStatus("idle")}
                  className="mt-10 overline text-[#d4af37] underline-reveal"
                >
                  {lang === "it" ? "Invia un'altra richiesta" : "Envoyer une autre demande"}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="consultation-form"
                className="bg-[#0d0f13] p-8 sm:p-10 lg:p-14 border border-white/5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="sm:col-span-2">
                    <label className="overline text-white/50 block mb-2">
                      {t.cta.formLabels.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      data-testid="form-company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t.cta.formPlaceholders.company}
                      className="arx-input"
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && (
                      <p data-testid="error-company" className="mt-2 text-xs text-red-400">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="overline text-white/50 block mb-2">
                      {t.cta.formLabels.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      data-testid="form-email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.cta.formPlaceholders.email}
                      className="arx-input"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p data-testid="error-email" className="mt-2 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="overline text-white/50 block mb-2">
                      {t.cta.formLabels.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      data-testid="form-phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t.cta.formPlaceholders.phone}
                      className="arx-input"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p data-testid="error-phone" className="mt-2 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="overline text-white/50 block mb-2">
                      {t.cta.formLabels.tier}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {t.cta.tierOptions.map((opt) => {
                        const active = form.tier === opt;
                        return (
                          <button
                            type="button"
                            key={opt}
                            data-testid={`tier-option-${opt.replace(/\s+/g, "-").toLowerCase()}`}
                            onClick={() => setForm((prev) => ({ ...prev, tier: opt }))}
                            className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors ${
                              active
                                ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                                : "border-white/15 text-white/65 hover:border-[#d4af37]/50 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="overline text-white/50 block mb-2">
                      {t.cta.formLabels.message}
                    </label>
                    <textarea
                      name="message"
                      data-testid="form-message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t.cta.formPlaceholders.message}
                      className="arx-input resize-none"
                    />
                  </div>
                </div>

                {status === "error" && errorMsg && (
                  <p
                    data-testid="form-error-message"
                    className="mt-6 text-sm text-red-400 border border-red-500/30 bg-red-500/5 px-4 py-3"
                  >
                    {errorMsg}
                  </p>
                )}

                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <p className="text-xs text-white/40 max-w-sm leading-relaxed">
                    {lang === "it"
                      ? "I tuoi dati sono trattati con riservatezza assoluta. Nessuna terza parte."
                      : "Vos données sont traitées en toute confidentialité. Aucune tierce partie."}
                  </p>
                  <button
                    type="submit"
                    data-testid="form-submit"
                    disabled={status === "submitting"}
                    className="btn-gold disabled:opacity-60"
                  >
                    {status === "submitting" ? t.cta.submitting : t.cta.submit}
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
