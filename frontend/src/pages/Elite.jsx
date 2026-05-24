import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Check, Sparkles, Cpu, Layers, Shield, Clock, Users, Zap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-[#c8a64a] text-xs tracking-[0.25em] uppercase mb-6 font-medium">
    <span className="w-8 h-px bg-[#c8a64a]"></span>
    {children}
  </div>
);

const StatBlock = ({ value, label, accent = false }) => (
  <div className="border-l border-[#343633] pl-6 py-2">
    <div
      className={`font-serif text-5xl md:text-6xl mb-2 ${
        accent ? 'text-[#c8a64a]' : 'text-white'
      }`}
      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
    >
      {value}
    </div>
    <div className="text-[#6f716d] text-xs tracking-[0.2em] uppercase">{label}</div>
  </div>
);

const PillarCard = ({ num, title, desc }) => (
  <div
    className="group bg-[#1f211f] border border-[#343633] rounded-lg p-6 hover:border-[#c8a64a]/60 transition-all duration-500 hover:-translate-y-1"
    data-testid={`pillar-${num}`}
  >
    <div className="flex items-baseline justify-between mb-4">
      <span
        className="text-[#c8a64a]/40 font-serif text-3xl group-hover:text-[#c8a64a] transition-colors duration-500"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {String(num).padStart(2, '0')}
      </span>
      <span className="w-8 h-px bg-[#343633] group-hover:bg-[#c8a64a] transition-colors duration-500"></span>
    </div>
    <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
    <p className="text-[#9a9a96] text-sm leading-relaxed">{desc}</p>
  </div>
);

const Elite = () => {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    interest: 'tbd',
    context: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.companyName.trim() || !form.email.trim()) {
      toast.error('Compila i campi obbligatori');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Email non valida');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/elite-consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: 'it' }),
      });
      if (!res.ok) throw new Error('error');
      toast.success('Richiesta inviata. Ti contatteremo entro 24 ore.');
      setForm({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        interest: 'tbd',
        context: '',
      });
    } catch {
      toast.error('Errore nell\'invio. Riprova tra qualche istante.');
    } finally {
      setSubmitting(false);
    }
  };

  const pillars = [
    { n: 1, t: 'Vendite Autonome', d: 'Pipeline gestita end-to-end dall\'IA.' },
    { n: 2, t: 'Marketing Predittivo', d: 'Campagne ottimizzate in tempo reale.' },
    { n: 3, t: 'Customer Care 24/7', d: 'Supporto multilingua sempre attivo.' },
    { n: 4, t: 'Operations Automatizzate', d: 'Workflow eseguiti senza supervisione.' },
    { n: 5, t: 'Finanza Intelligente', d: 'Controllo, budget, forecast automatico.' },
    { n: 6, t: 'Data Intelligence', d: 'Insight strategici da ogni dato aziendale.' },
    { n: 7, t: 'Lead Generation', d: 'Acquisizione qualificata in continuo.' },
    { n: 8, t: 'Content Factory', d: 'Produzione di contenuto su scala industriale.' },
    { n: 9, t: 'CRM Autonomo', d: 'Relazioni cliente coltivate dall\'IA.' },
    { n: 10, t: 'Reporting Real-time', d: 'Dashboard executive sempre aggiornata.' },
    { n: 11, t: 'Quality Assurance AI', d: 'Controllo qualità su ogni output.' },
    { n: 12, t: 'Procurement AI', d: 'Approvvigionamento ottimizzato in autonomia.' },
    { n: 13, t: 'HR & Talent AI', d: 'Selezione e onboarding automatizzati.' },
  ];

  return (
    <main className="bg-[#0e0f0e] text-white elite-page" data-testid="elite-page">
      <style>{`
        .elite-page {
          --gold: #c8a64a;
          --gold-soft: #d4b86b;
          --ink: #0e0f0e;
          --panel: #1a1c1a;
          --panel-2: #1f211f;
          --line: #2a2c2a;
        }
        .elite-page h1, .elite-page h2, .elite-page .serif {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .elite-page .italic-em {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }
        .elite-page .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--gold);
          color: #0e0f0e;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all .3s ease;
          border: 1px solid var(--gold);
          cursor: pointer;
        }
        .elite-page .btn-gold:hover {
          background: transparent;
          color: var(--gold);
          transform: translateY(-1px);
        }
        .elite-page .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: transparent;
          color: #fff;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid #343633;
          border-radius: 2px;
          transition: all .3s ease;
          cursor: pointer;
        }
        .elite-page .btn-ghost:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .elite-page .micro-label {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #6f716d;
        }
        .elite-page .input-elite {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #343633;
          padding: 14px 0;
          color: #fff;
          font-size: 15px;
          transition: border-color .3s;
        }
        .elite-page .input-elite:focus {
          outline: none;
          border-bottom-color: var(--gold);
        }
        .elite-page .input-elite::placeholder { color: #5a5c58; }
      `}</style>

      {/* SUB-NAV */}
      <div className="sticky top-20 z-30 bg-[#0e0f0e]/90 backdrop-blur-md border-b border-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-baseline gap-3">
              <span
                className="serif text-2xl text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Arxéon
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#c8a64a] uppercase px-2 py-1 border border-[#c8a64a]/40">
                Elite
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-7 text-xs tracking-[0.18em] uppercase text-[#9a9a96]">
              <button onClick={() => scrollTo('valore')} className="hover:text-[#c8a64a] transition-colors" data-testid="nav-valore">Valore</button>
              <button onClick={() => scrollTo('architettura')} className="hover:text-[#c8a64a] transition-colors" data-testid="nav-architettura">Architettura</button>
              <button onClick={() => scrollTo('pilastri')} className="hover:text-[#c8a64a] transition-colors" data-testid="nav-pilastri">13 Pilastri</button>
              <button onClick={() => scrollTo('blueprint')} className="hover:text-[#c8a64a] transition-colors" data-testid="nav-blueprint">Blueprint</button>
              <button onClick={() => scrollTo('strategia')} className="hover:text-[#c8a64a] transition-colors" data-testid="nav-strategia">Strategia</button>
            </nav>
            <button onClick={() => scrollTo('contatto')} className="btn-gold hidden md:inline-flex" data-testid="cta-consultazione-top">
              Consultazione <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden" data-testid="hero-section">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, #c8a64a 0%, transparent 50%), radial-gradient(circle at 70% 70%, #c8a64a 0%, transparent 50%)',
          }}
        ></div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
          <SectionLabel>Arxéon Elite · AI Factory</SectionLabel>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8 max-w-5xl">
            L'Azienda che si gestisce da <span className="italic-em">sola.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9a9a96] max-w-2xl leading-relaxed mb-12">
            Architettura d'impresa autonoma, guidata dall'Intelligenza Artificiale. Precisione svizzera, efficienza assoluta.
          </p>
          <div className="flex flex-wrap gap-4 mb-20">
            <button onClick={() => scrollTo('contatto')} className="btn-gold" data-testid="cta-consultazione-hero">
              Richiedi consultazione strategica <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo('valore')} className="btn-ghost" data-testid="cta-soluzioni">
              Esplora le soluzioni
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
            <StatBlock value="15" label="Giorni · Custom AI Apps" accent />
            <StatBlock value="24/7" label="Zane · Chief of Staff IA" accent />
            <StatBlock value="13" label="Pilastri · Elite Architecture" />
            <StatBlock value="CH" label="Swiss Engineered" />
          </div>

          <div className="mt-20 flex items-center gap-2 text-[#6f716d] text-xs tracking-[0.2em] uppercase animate-pulse">
            <ArrowDown size={14} /> Scroll
          </div>
        </div>
      </section>

      {/* VALUE LADDER */}
      <section id="valore" className="py-24 md:py-32 border-t border-[#1f211f]" data-testid="value-ladder-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <SectionLabel>Le soluzioni</SectionLabel>
          <h2 className="text-4xl md:text-6xl text-white leading-tight max-w-4xl mb-6">
            Due acceleratori. <span className="italic-em">Un'unica architettura.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Inizia con un risultato concreto in 15 giorni. Scala con un Chief of Staff IA. Poi, quando sei pronto, accedi all'AI Factory completa.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Custom AI Apps - Featured */}
            <div className="lg:col-span-1 bg-gradient-to-br from-[#1f211f] to-[#1a1c1a] border border-[#c8a64a]/40 rounded-lg p-8 relative overflow-hidden" data-testid="card-custom-ai-apps">
              <div className="absolute top-0 right-0 bg-[#c8a64a] text-[#0e0f0e] text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold">
                ★ Popolare
              </div>
              <div className="micro-label mb-4 mt-2">· Livello 1 · Entry</div>
              <h3 className="serif text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Custom AI Apps
              </h3>
              <p className="text-[#c8a64a] text-sm mb-6 italic">Risultato in 15 giorni. Garantito.</p>
              <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
                Identifichiamo il collo di bottiglia che ti sta costando di più. Costruiamo l'app IA su misura che lo elimina. Live in produzione in 15 giorni di calendario, non un giorno di più.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Delivery contrattuale in 15 giorni',
                  'Integrazione diretta col tuo stack attuale',
                  'ROI misurabile dal primo mese',
                  'Codice di proprietà del cliente',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <Check size={14} className="text-[#c8a64a] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatto')} className="btn-gold w-full justify-center" data-testid="cta-custom-ai-apps">
                Sblocca il tuo collo di bottiglia
              </button>
            </div>

            {/* ZANE - Featured Premium */}
            <div className="lg:col-span-1 bg-gradient-to-br from-[#c8a64a]/10 via-[#1f211f] to-[#1a1c1a] border-2 border-[#c8a64a] rounded-lg p-8 relative overflow-hidden lg:scale-[1.02]" data-testid="card-zane">
              <div className="absolute top-0 right-0 bg-[#c8a64a] text-[#0e0f0e] text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold">
                ★ Richiesto
              </div>
              <div className="micro-label mb-4 mt-2">· Livello 2 · Core</div>
              <h3 className="serif text-4xl md:text-5xl text-[#c8a64a] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Zane
              </h3>
              <p className="text-white text-sm mb-6 italic">Il Chief of Staff IA che non dorme mai.</p>
              <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
                Zane è l'Assistente IA che ogni founder ha sempre desiderato. Memoria aziendale, decisioni in autonomia, esecuzione 24/7. Coordina team, gestisce calendari, scrive proposal, processa email e ti restituisce 30+ ore alla settimana. Non un chatbot. Un Chief of Staff.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Memoria contestuale dell\'azienda',
                  'Esecuzione autonoma multi-task',
                  'Integrato con Email, Slack, CRM, Calendar',
                  'Onboarding completo in 7 giorni',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <Sparkles size={14} className="text-[#c8a64a] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contatto')} className="btn-gold w-full justify-center" data-testid="cta-zane">
                Conosci Zane
              </button>
            </div>

            {/* Elite 2.0 */}
            <div className="lg:col-span-1 bg-[#1a1c1a] border border-[#343633] rounded-lg p-8 relative" data-testid="card-elite-2">
              <div className="micro-label mb-4">· Livello Premium</div>
              <h3 className="serif text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Arxéon Elite 2.0
              </h3>
              <p className="text-[#c8a64a] text-sm mb-6 italic">L'AI Factory completa.</p>
              <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
                Quando hai già stabilizzato il modello e vuoi automatizzare l'intera azienda. 13 pilastri, 1 CEO AI e 5 Dirigenti AI orchestrano marketing, vendite, operations, finanza e customer care.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Architettura completa 13 pilastri',
                  '1 CEO AI + 5 Dirigenti AI',
                  'Governance e reporting executive',
                  'Implementazione fased (3-6 mesi)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <span className="text-[#c8a64a] text-xs font-bold mt-0.5 w-5 flex-shrink-0">0{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('architettura')} className="btn-ghost w-full justify-center" data-testid="cta-elite-2">
                Esplora l'AI Factory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ELITE 2.0 INTRO */}
      <section id="architettura" className="py-24 md:py-32 border-t border-[#1f211f] bg-[#0a0b0a] relative" data-testid="elite-intro-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <SectionLabel>Livello Premium · Arxéon Elite 2.0</SectionLabel>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl text-white leading-tight mb-6">
                Per chi è pronto all'<span className="italic-em">AI Factory completa.</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-8">
                Hai già stabilizzato Custom Apps e Zane? Sei pronto a costruire un'azienda che si gestisce da sola. Quello che segue è l'architettura completa: 13 pilastri, 1 CEO AI, 5 Dirigenti AI.
              </p>
            </div>
            <div className="lg:col-span-5 text-center lg:text-right">
              <div
                className="serif text-[160px] md:text-[200px] text-[#c8a64a]/20 leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                2.0
              </div>
            </div>
          </div>

          {/* Decisional Architecture */}
          <div className="mt-24">
            <SectionLabel>Architettura decisionale</SectionLabel>
            <h3 className="text-3xl md:text-5xl text-white leading-tight max-w-4xl mb-6">
              1 CEO AI. 5 Dirigenti AI. <span className="italic-em">Zero attriti.</span>
            </h3>
            <p className="text-[#9a9a96] text-lg max-w-3xl mb-16 leading-relaxed">
              Una costellazione di intelligenze coordinate. Il CEO AI orchestra le decisioni strategiche; i cinque Dirigenti AI eseguono con autonomia totale nei rispettivi dipartimenti.
            </p>

            {/* Org Chart */}
            <div className="bg-[#1a1c1a] border border-[#343633] rounded-lg p-8 md:p-12">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#c8a64a] to-[#a78938] text-[#0e0f0e] rounded-lg px-10 py-6 mb-2 text-center min-w-[220px]" data-testid="ceo-ai-node">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">Orchestrazione · Strategia</div>
                  <div className="serif text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>CEO AI</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-[#c8a64a] to-[#343633]"></div>
                <div className="w-full max-w-4xl h-px bg-[#343633] relative">
                  <div className="absolute inset-x-0 flex justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-px h-12 bg-[#343633] -mt-px"></div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12 w-full max-w-4xl">
                  {['Marketing', 'Vendite', 'Operations', 'Finanza', 'Customer Care'].map((dept, i) => (
                    <div
                      key={i}
                      className="border border-[#343633] bg-[#0e0f0e] rounded-lg px-4 py-4 text-center hover:border-[#c8a64a] transition-colors"
                      data-testid={`dirigente-${dept.toLowerCase().replace(' ', '-')}`}
                    >
                      <div className="text-[#c8a64a] text-[10px] tracking-[0.2em] uppercase mb-1">
                        0{i + 1}
                      </div>
                      <div className="text-white text-sm font-medium">Direttore AI</div>
                      <div className="text-[#9a9a96] text-xs mt-1">{dept}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13 PILLARS */}
      <section id="pilastri" className="py-24 md:py-32 border-t border-[#1f211f]" data-testid="pillars-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <SectionLabel>Fondamenta</SectionLabel>
          <div className="flex flex-wrap items-baseline justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-6xl text-white leading-tight max-w-3xl">
              I <span className="italic-em">13 Pilastri</span> dell'AI Factory.
            </h2>
            <div
              className="serif text-7xl md:text-8xl text-[#c8a64a]/30"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              13
            </div>
          </div>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-16 leading-relaxed">
            Ogni pilastro è un sotto-sistema autonomo. Insieme, formano l'architettura di un'azienda che opera senza intervento umano sui processi ripetibili.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pillars.map((p) => (
              <PillarCard key={p.n} num={p.n} title={p.t} desc={p.d} />
            ))}
            <div className="bg-gradient-to-br from-[#c8a64a]/20 to-[#1a1c1a] border border-[#c8a64a]/50 rounded-lg p-6 flex flex-col justify-between" data-testid="pillar-infinity">
              <div
                className="serif text-6xl text-[#c8a64a] leading-none mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ∞
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">Sistema Unico</h3>
                <p className="text-[#9a9a96] text-sm leading-relaxed">
                  Tutti i pilastri operano come un'unica intelligenza coordinata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUEPRINT */}
      <section id="blueprint" className="py-24 md:py-32 border-t border-[#1f211f] bg-[#0a0b0a]" data-testid="blueprint-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <SectionLabel>Blueprint tecnico</SectionLabel>
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#c8a64a] -mt-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a64a] animate-pulse"></span> Live
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl text-white leading-tight max-w-4xl mb-6">
            L'anatomia di un'<span className="italic-em">AI Factory.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Niente case study patinati. Niente testimonianze. Qui mostriamo l'architettura tecnica che costruiamo per ogni cliente. Un sistema reale, non una promessa.
          </p>

          <div className="space-y-6">
            {[
              {
                layer: 'L1',
                icon: Layers,
                title: 'Acquisition Layer',
                subtitle: 'Pipeline di acquisizione autonoma',
                desc: 'Identificazione, qualifica e routing dei lead in tempo reale. L\'IA filtra il rumore prima che arrivi a un essere umano.',
                components: [
                  'Lead Capture multicanale',
                  'Enrichment & Scoring IA',
                  'Qualifica conversazionale',
                  'Routing automatico al canale corretto',
                  'Scheduling e first-touch',
                ],
                metrics: [
                  { v: '< 60s', l: 'Time to first response' },
                  { v: '94%', l: 'Lead qualificati correttamente' },
                ],
              },
              {
                layer: 'L2',
                icon: Cpu,
                title: 'Orchestration Layer · Zane',
                subtitle: 'Il Chief of Staff IA',
                desc: 'Zane è il sistema operativo dell\'azienda. Riceve, prioritizza e dispatcha ogni task ai sotto-sistemi corretti. Memoria contestuale, decision logic, escalation rules.',
                components: [
                  'Context Memory persistente',
                  'Task router multi-agente',
                  'Priority queue dinamica',
                  'Escalation logic configurabile',
                  'Executive reporting in tempo reale',
                ],
                metrics: [
                  { v: '24/7', l: 'Operatività' },
                  { v: 'n+1', l: 'Agenti coordinati' },
                ],
              },
              {
                layer: 'L3',
                icon: Zap,
                title: 'Execution Layer · 13 Pilastri',
                subtitle: 'I sotto-sistemi specializzati',
                desc: 'Ogni pilastro è un servizio autonomo con API, monitoring e fallback. Vendite, Marketing, Finanza, Operations: tutto disaccoppiato, tutto osservabile.',
                components: [
                  'Microservizi specializzati per dominio',
                  'API contract & observability',
                  'Quality Assurance IA su ogni output',
                  'Fallback umano configurabile',
                  'Dashboard executive consolidata',
                ],
                metrics: [
                  { v: '13', l: 'Sotto-sistemi attivi' },
                  { v: '99.5%', l: 'Uptime garantito' },
                ],
              },
            ].map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.layer}
                  className="bg-[#1a1c1a] border border-[#343633] rounded-lg p-8 md:p-10 hover:border-[#c8a64a]/40 transition-colors"
                  data-testid={`blueprint-${layer.layer.toLowerCase()}`}
                >
                  <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5">
                      <div className="micro-label mb-3 text-[#c8a64a]">· Layer {layer.layer}</div>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon size={24} className="text-[#c8a64a]" />
                        <h3
                          className="serif text-3xl md:text-4xl text-white"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {layer.title}
                        </h3>
                      </div>
                      <p className="text-[#c8a64a] text-sm italic mb-4">{layer.subtitle}</p>
                      <p className="text-[#9a9a96] text-sm leading-relaxed">{layer.desc}</p>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="micro-label mb-4">Componenti</div>
                      <ul className="space-y-2">
                        {layer.components.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                            <span className="text-[#c8a64a]/60 text-xs font-mono mt-1 w-5 flex-shrink-0">
                              0{i + 1}
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-3 space-y-4">
                      {layer.metrics.map((m, i) => (
                        <div key={i} className="bg-[#0e0f0e] border border-[#343633] rounded p-4">
                          <div
                            className="serif text-3xl text-[#c8a64a] mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {m.v}
                          </div>
                          <div className="text-[10px] tracking-[0.2em] uppercase text-[#6f716d]">
                            {m.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stack */}
          <div className="mt-12 bg-[#1a1c1a] border border-[#343633] rounded-lg p-8 md:p-10" data-testid="tech-stack">
            <div className="micro-label mb-6">Stack tecnologico</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {[
                ['LLM frontier', 'GPT / Claude / Gemini'],
                ['Vector DB', 'Memoria contestuale'],
                ['Orchestration', 'Agent framework proprietario'],
                ['Observability', 'Logging + tracing end-to-end'],
                ['Infrastructure', 'Cloud svizzero / EU'],
                ['Security', 'SOC2-ready, GDPR-native'],
              ].map(([k, v], i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#343633] pb-3">
                  <span className="text-white text-sm font-medium">{k}</span>
                  <span className="text-[#9a9a96] text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-16 max-w-3xl">
            <p
              className="serif text-2xl md:text-3xl text-white/90 italic leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "Mostriamo come è costruito. Non chiediamo di crederci sulla parola."
            </p>
            <footer className="micro-label mt-4">Arxéon · Engineering</footer>
          </blockquote>
        </div>
      </section>

      {/* STRATEGIC MODEL */}
      <section id="strategia" className="py-24 md:py-32 border-t border-[#1f211f]" data-testid="strategy-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <SectionLabel>Modello strategico</SectionLabel>
          <h2 className="text-4xl md:text-6xl text-white leading-tight max-w-5xl mb-6">
            High-Ticket. Volume automatizzato. <span className="italic-em">Equilibrio svizzero.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Arxéon non è solo automazione. È un modello strategico che bilancia l'esclusività high-ticket con l'efficienza dei volumi gestiti dall'IA.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                t: 'Esclusività High-Ticket',
                d: 'Posizionamento premium, margini protetti, clienti selezionati con criteri di qualità.',
              },
              {
                icon: Zap,
                t: 'Volume Automatizzato',
                d: 'L\'IA gestisce le quantità che un team umano non potrebbe mai sostenere senza degradare la qualità.',
              },
              {
                icon: Cpu,
                t: 'Precisione Svizzera',
                d: 'Processi standardizzati, governance rigorosa, output costante e prevedibile.',
              },
              {
                icon: Clock,
                t: 'Tempo Recuperato',
                d: 'Il founder torna a fare il founder: visione, alleanze, capitale. L\'IA esegue.',
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-[#1a1c1a] border border-[#343633] rounded-lg p-6 hover:border-[#c8a64a]/40 transition-colors"
                  data-testid={`strategy-${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="serif text-3xl text-[#c8a64a]/40"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      0{i + 1}
                    </span>
                    <Icon size={18} className="text-[#c8a64a]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{p.t}</h3>
                  <p className="text-[#9a9a96] text-sm leading-relaxed">{p.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contatto" className="py-24 md:py-32 border-t border-[#1f211f] bg-[#0a0b0a]" data-testid="contact-section">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <SectionLabel>Consultazione strategica</SectionLabel>
              <h2 className="text-4xl md:text-6xl text-white leading-tight mb-6">
                Inizia la <span className="italic-em">trasformazione.</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-10">
                Una conversazione riservata di 45 minuti con il team Arxéon. Valutiamo il fit, mappiamo il bottleneck principale, definiamo il percorso.
              </p>
              <div className="space-y-6">
                {[
                  { v: '45\'', l: 'Consultazione riservata', i: Clock },
                  { v: '24h', l: 'Risposta garantita', i: Zap },
                  { v: '1:1', l: 'Con il team Arxéon', i: Users },
                ].map((it, i) => {
                  const Icon = it.i;
                  return (
                    <div key={i} className="flex items-center gap-4 pb-6 border-b border-[#1f211f]">
                      <Icon size={20} className="text-[#c8a64a]" />
                      <div
                        className="serif text-2xl text-white min-w-[60px]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {it.v}
                      </div>
                      <div className="text-[#9a9a96] text-sm">{it.l}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="bg-[#1a1c1a] border border-[#343633] rounded-lg p-8 md:p-12 space-y-8"
                data-testid="elite-consultation-form"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="micro-label block mb-2">Nome <span className="text-[#c8a64a]">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="input-elite"
                      placeholder="Mario Rossi"
                      data-testid="input-fullname"
                      required
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Azienda <span className="text-[#c8a64a]">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      className="input-elite"
                      placeholder="La tua azienda SA"
                      data-testid="input-company"
                      required
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Email <span className="text-[#c8a64a]">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="input-elite"
                      placeholder="mario@azienda.ch"
                      data-testid="input-email"
                      required
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Telefono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="input-elite"
                      placeholder="+41 00 000 00 00"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="micro-label block mb-4">Livello di interesse</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'custom_ai_apps', label: 'Custom AI Apps' },
                      { id: 'zane', label: 'Zane' },
                      { id: 'elite_2', label: 'Arxéon Elite 2.0' },
                      { id: 'tbd', label: 'Da definire' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, interest: opt.id }))}
                        className={`px-4 py-3 text-xs tracking-[0.1em] uppercase font-medium transition-all border ${
                          form.interest === opt.id
                            ? 'bg-[#c8a64a] text-[#0e0f0e] border-[#c8a64a]'
                            : 'bg-transparent text-[#9a9a96] border-[#343633] hover:border-[#c8a64a] hover:text-white'
                        }`}
                        data-testid={`interest-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="micro-label block mb-2">Contesto <span className="text-[#5a5c58] normal-case tracking-normal">(opzionale)</span></label>
                  <textarea
                    name="context"
                    value={form.context}
                    onChange={handleChange}
                    rows={4}
                    className="input-elite resize-none"
                    placeholder="Raccontaci brevemente la tua situazione attuale..."
                    data-testid="input-context"
                  />
                </div>

                <div className="pt-4 border-t border-[#343633]">
                  <p className="text-[#6f716d] text-xs mb-6 italic">
                    I tuoi dati sono trattati con riservatezza assoluta. Nessuna terza parte.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="submit-consultation"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Invio in corso...
                      </>
                    ) : (
                      <>
                        Prenota consultazione <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Elite;
