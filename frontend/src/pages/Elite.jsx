import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Check,
  Crown,
  Megaphone,
  TrendingUp,
  GitBranch,
  Wallet,
  Heart,
  Target,
  MessageSquare,
  Settings,
  PieChart,
  Database,
  Sparkles,
  PenTool,
  Users,
  Activity,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
  Network,
  Layers,
  Boxes,
  Building2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Label = ({ children }) => (
  <div className="flex items-center gap-3 text-[#c8a46b] text-[11px] tracking-[0.28em] uppercase mb-8 font-medium">
    <span className="w-10 h-px bg-[#c8a46b]"></span>
    {children}
  </div>
);

const Stat = ({ value, label }) => (
  <div className="border-l border-[#2a2c2a] pl-6 py-4">
    <div className="font-serif text-5xl md:text-6xl text-[#c8a46b] mb-3 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
      {value}
    </div>
    <div className="text-[#6f716d] text-[10px] tracking-[0.22em] uppercase leading-relaxed">{label}</div>
  </div>
);

const Pillar = ({ num, icon: Icon, title, desc }) => (
  <div className="relative bg-[#131413] border border-[#222421] p-6 hover:border-[#c8a46b]/40 transition-all duration-500 hover:bg-[#171816]" data-testid={`pillar-${num}`}>
    <div className="absolute top-4 right-4 text-[#c8a46b]/40 text-[10px] tracking-[0.2em] font-mono">
      {String(num).padStart(2, '0')}
    </div>
    <Icon size={20} className="text-[#c8a46b] mb-12" strokeWidth={1.5} />
    <h3 className="font-serif text-xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
      {title}
    </h3>
    <p className="text-[#7a7c78] text-sm leading-relaxed">{desc}</p>
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
  const [roiPeople, setRoiPeople] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ROI calc: 8 persone => 193'600 CHF/anno (baseline ~24'200 per person)
  const roiAnnual = useMemo(() => {
    const perPerson = 24200;
    return Math.round(roiPeople * perPerson).toLocaleString('de-CH').replace(/,/g, "'");
  }, [roiPeople]);

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
      setForm({ fullName: '', companyName: '', email: '', phone: '', interest: 'tbd', context: '' });
    } catch {
      toast.error('Errore nell\'invio. Riprova.');
    } finally {
      setSubmitting(false);
    }
  };

  const pillars = [
    { n: 1, i: TrendingUp, t: 'Vendite Autonome', d: 'Pipeline gestita end-to-end dall\'IA.' },
    { n: 2, i: Target, t: 'Marketing Predittivo', d: 'Campagne ottimizzate in tempo reale.' },
    { n: 3, i: MessageSquare, t: 'Customer Care 24/7', d: 'Supporto multilingua sempre attivo.' },
    { n: 4, i: Settings, t: 'Operations Automatizzate', d: 'Workflow eseguiti senza supervisione.' },
    { n: 5, i: PieChart, t: 'Finanza Intelligente', d: 'Controllo, budget, forecast automatico.' },
    { n: 6, i: Database, t: 'Data Intelligence', d: 'Insight strategici da ogni dato aziendale.' },
    { n: 7, i: Sparkles, t: 'Lead Generation', d: 'Acquisizione qualificata in continuo.' },
    { n: 8, i: PenTool, t: 'Content Factory', d: 'Produzione di contenuto su scala industriale.' },
    { n: 9, i: Users, t: 'CRM Autonomo', d: 'Relazioni cliente coltivate dall\'IA.' },
    { n: 10, i: Activity, t: 'Reporting Real-time', d: 'Dashboard executive sempre aggiornata.' },
    { n: 11, i: ShieldCheck, t: 'Quality Assurance AI', d: 'Controllo qualità su ogni output.' },
    { n: 12, i: ShoppingCart, t: 'Procurement AI', d: 'Approvvigionamento ottimizzato in autonomia.' },
    { n: 13, i: UserPlus, t: 'HR & Talent AI', d: 'Selezione e onboarding automatizzati.' },
  ];

  const zanePlans = [
    {
      id: 'lite',
      name: 'Zane Lite',
      tagline: 'Recupera la tua energia, focalizzati sul tuo core business.',
      audience: 'FOUNDER · LIBERI PROFESSIONISTI · SOLOPRENEUR',
      price: '78',
      setup: 'Setup CHF 450',
      description: 'Il tuo scudo personale IA. Filtra email, organizza il calendario, prepara briefing, gestisce ricerche e follow-up. Recuperi lucidità mentale e tempo per il lavoro che ti ha portato fin qui.',
      features: [
        'Inbox filtrata e priorità giornaliere',
        'Calendario e scheduling senza attrito',
        'Briefing personali quotidiani e settimanali',
        'Memoria contestuale persistente',
        'Onboarding in 7 giorni',
      ],
    },
    {
      id: 'business',
      name: 'Zane Business',
      featured: true,
      tagline: 'Potenzia il team eliminando i colli di bottiglia operativi.',
      audience: 'PMI · STUDI PROFESSIONALI · AZIENDE 10-50 PERSONE',
      price: '780',
      setup: 'Setup CHF 2\'500',
      description: 'Outreach ripetitivo, gestione lead, ticket di assistenza, coordinamento operativo. Zane assorbe il rumore. Le persone tornano a fare il lavoro per cui le hai assunte: relazioni, decisioni, valore.',
      features: [
        'Outreach automatizzato e qualifica lead',
        'Customer Care 24/7 multilingua',
        'Operations e workflow senza attrito',
        'Integrazioni CRM / ERP / Email',
        'Dashboard salute del team operativo',
      ],
    },
    {
      id: 'elite',
      name: 'Zane Elite',
      tagline: 'La tua bussola strategica per navigare la complessità senza stress.',
      audience: 'AZIENDE STRUTTURATE · HOLDING · CEO D\'ÉLITE',
      price: '5\'000',
      setup: 'Setup CHF 5\'000',
      description: 'Oltre l\'operatività. Zane Elite gestisce la complessità che ti tiene sveglio la notte: analisi predittiva, simulazione scenari, executive briefing. Tu decidi con la mente libera, con i numeri già letti.',
      features: [
        'Analisi predittiva sui KPI aziendali',
        'Executive briefing settimanali sintetizzati',
        'Simulazione scenari decisionali',
        'Integrazione data warehouse e BI',
        'Account dedicato Arxeon',
      ],
    },
  ];

  return (
    <main className="bg-[#0a0b0a] text-white elite-page min-h-screen" data-testid="elite-page">
      <style>{`
        .elite-page {
          --gold: #c8a46b;
          --gold-bright: #d4b681;
          --ink: #0a0b0a;
          --ink-2: #0e0f0e;
          --panel: #131413;
          --line: #222421;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
        }
        .elite-page .serif,
        .elite-page h1,
        .elite-page h2,
        .elite-page h3,
        .elite-page .display {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-weight: 500;
          letter-spacing: -0.015em;
        }
        .elite-page .italic-gold {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }
        .elite-page .micro {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6f716d;
          font-weight: 500;
        }
        .elite-page .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: var(--gold);
          color: #0a0b0a;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: all .35s ease;
          border: 1px solid var(--gold);
          cursor: pointer;
        }
        .elite-page .btn-gold:hover {
          background: var(--gold-bright);
          border-color: var(--gold-bright);
        }
        .elite-page .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: transparent;
          color: #fff;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid #2a2c2a;
          transition: all .35s ease;
          cursor: pointer;
        }
        .elite-page .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .elite-page .link-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--gold);
          transition: gap .3s;
        }
        .elite-page .link-gold:hover { gap: 16px; }
        .elite-page .input-elite {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #2a2c2a;
          padding: 14px 0;
          color: #fff;
          font-size: 15px;
          transition: border-color .3s;
        }
        .elite-page .input-elite:focus {
          outline: none;
          border-bottom-color: var(--gold);
        }
        .elite-page .input-elite::placeholder { color: #4a4c48; }
        .elite-page .dotted-line {
          background-image: linear-gradient(to right, #2a2c2a 50%, transparent 50%);
          background-size: 8px 1px;
          background-repeat: repeat-x;
          height: 1px;
        }
      `}</style>

      {/* TOP UTILITY BAR */}
      <div className="border-b border-[#1a1c1a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-3 text-[10px] tracking-[0.22em] uppercase">
            <Link to="/" className="text-[#6f716d] hover:text-[#c8a46b] transition-colors flex items-center gap-2" data-testid="back-to-arxeon">
              ← Arxeon.ch
            </Link>
            <div className="text-[#6f716d] hidden sm:flex items-center gap-3">
              <span>B2B</span><span className="text-[#3a3c38]">·</span>
              <span>Riservato</span><span className="text-[#3a3c38]">·</span>
              <span>Su selezione</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="sticky top-0 z-40 bg-[#0a0b0a]/95 backdrop-blur-md border-b border-[#1a1c1a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <span className="display text-2xl md:text-3xl text-white tracking-[0.15em]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                ARXEON
              </span>
              <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">
                Elite
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-9 text-[10px] tracking-[0.25em] uppercase text-[#9a9a96] font-medium">
              <button onClick={() => scrollTo('valore')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-valore">Valore</button>
              <button onClick={() => scrollTo('architettura')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-architettura">Architettura</button>
              <button onClick={() => scrollTo('pilastri')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-pilastri">13 Pilastri</button>
              <button onClick={() => scrollTo('blueprint')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-blueprint">Blueprint</button>
              <button onClick={() => scrollTo('strategia')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-strategia">Strategia</button>
            </nav>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase">
                <span className="text-[#c8a46b]">IT</span>
                <span className="text-[#3a3c38]">·</span>
                <span className="text-[#6f716d]">FR</span>
              </div>
              <button onClick={() => scrollTo('contatto')} className="btn-outline !py-3 !px-5" data-testid="cta-consultazione-top">
                Consultazione <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40" data-testid="hero-section">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 1200px 600px at 60% 50%, rgba(200,164,107,0.06), transparent 70%)' }}></div>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative">
          <Label>Arxeon Elite · AI Factory</Label>
          <h1 className="display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.95] mb-12 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            L'Azienda che si gestisce da <span className="italic-gold">sola.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9a9a96] max-w-2xl leading-relaxed mb-14">
            Più tempo per il founder. Più energia per il team. Meno attrito sulle attività ripetitive. L'IA che assorbe la complessità, lasciando le persone libere di creare valore.
          </p>
          <div className="flex flex-wrap gap-4 mb-24">
            <button onClick={() => scrollTo('contatto')} className="btn-gold" data-testid="cta-consultazione-hero">
              Richiedi consultazione strategica <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo('valore')} className="btn-outline" data-testid="cta-soluzioni">
              Esplora le soluzioni
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl">
            <Stat value="15" label="Giorni · ROI Custom AI Apps" />
            <Stat value="30+" label="Ore/settimana restituite al team" />
            <Stat value="−40%" label="Attrito operativo · Elite 2.0" />
            <Stat value="24/7" label="Operatività senza burnout" />
          </div>

          <div className="mt-20 flex flex-col items-center text-[#6f716d]">
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3">Scroll</div>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* VALUE LADDER (2 cards) */}
      <section id="valore" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="value-ladder-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Le soluzioni</Label>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-6 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Due acceleratori. <span className="italic-gold">Un'unica architettura.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Inizia con un risultato concreto in 15 giorni. Scala con un Chief of Staff IA. Poi, quando sei pronto, accedi all'AI Factory completa.
          </p>

          <div className="grid lg:grid-cols-2 gap-px bg-[#1a1c1a]">
            {/* Custom AI Apps */}
            <div className="bg-[#0e0f0e] p-10 md:p-14" data-testid="card-custom-ai-apps">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">★ Popolare</span>
                <span className="micro">Livello 1 · Entry</span>
              </div>
              <h3 className="display text-4xl md:text-5xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Custom AI Apps
              </h3>
              <p className="italic-gold text-base mb-8 italic">Risultato in 15 giorni. Garantito.</p>
              <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">
                Identifichiamo il collo di bottiglia che ti sta costando di più. Costruiamo l'app IA su misura che lo elimina. Live in produzione in 15 giorni di calendario, non un giorno di più.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Payback medio entro 60 giorni dal go-live',
                  'Integrazione diretta col tuo stack attuale',
                  'Codice di proprietà del cliente · zero lock-in',
                ].map((it, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/90 text-sm">
                    <Check size={14} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('roi')} className="btn-gold" data-testid="cta-custom-ai-apps">
                Calcola il tuo ROI <ArrowRight size={14} />
              </button>
            </div>

            {/* Zane */}
            <div className="bg-[#0e0f0e] p-10 md:p-14 relative" data-testid="card-zane">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">★ Richiesto</span>
                <span className="micro">Livello 2 · Core</span>
              </div>
              <h3 className="display text-4xl md:text-5xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Zane
              </h3>
              <p className="italic-gold text-base mb-8 italic">Il Chief of Staff IA che non dorme mai.</p>
              <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">
                Zane è l'Assistente IA che ogni founder ha sempre desiderato. Memoria aziendale, decisioni in autonomia, esecuzione 24/7. Coordina team, gestisce calendari, scrive proposal, processa email e ti restituisce 30+ ore alla settimana. Non un chatbot. Un Chief of Staff.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Da CHF 78/mese · Setup da CHF 450',
                  'Elimina i colli di bottiglia operativi del team',
                  '30+ ore/settimana restituite al lavoro strategico',
                  'Onboarding completo in 7 giorni',
                ].map((it, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/90 text-sm">
                    <Check size={14} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('piani-zane')} className="btn-gold" data-testid="cta-zane">
                Vedi i piani Zane <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* L'UPGRADE DEFINITIVO - Elite 2.0 panel */}
      <section className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="upgrade-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>L'upgrade definitivo</Label>
          <div className="border border-[#222421] bg-gradient-to-br from-[#131413] to-[#0e0f0e]">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-[#222421]">
                <div className="flex items-center gap-2 micro mb-8">
                  <Building2 size={14} className="text-[#c8a46b]" /> · Livello Premium
                </div>
                <h3 className="display text-5xl md:text-6xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Arxeon Elite 2.0
                </h3>
                <p className="italic-gold text-lg mb-12 italic">L'azienda intera, senza l'attrito.</p>
              </div>
              <div className="p-10 md:p-16">
                <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">
                  Per founder che vogliono ridurre del 40% l'attrito operativo senza sacrificare il fatturato. 13 pilastri, 1 CEO AI e 5 Dirigenti AI gestiscono il rumore quotidiano. Il team umano lavora sulle decisioni che contano davvero.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    '−40% attrito operativo nei primi 12 mesi',
                    'Scala il fatturato senza esaurire il team',
                    'Reporting executive consolidato in tempo reale',
                    'Implementazione phased (3-6 mesi)',
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-[#c8a46b] text-[10px] font-mono tracking-wider mt-1">0{i + 1}</span>
                      <span className="text-white/90 text-sm leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo('architettura')} className="link-gold" data-testid="cta-explore-ai-factory">
                  Esplora l'AI Factory <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITETTURA - Elite 2.0 intro */}
      <section id="architettura" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="architecture-intro">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Livello Premium · Arxeon Elite 2.0</Label>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Per chi è pronto all'<span className="italic-gold">AI Factory completa.</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed max-w-3xl">
                Hai già stabilizzato Custom Apps e Zane? Sei pronto a ridurre del 40% l'attrito operativo dell'intera azienda senza sacrificare il fatturato. Quello che segue è l'architettura completa: 13 pilastri, 1 CEO AI, 5 Dirigenti AI.
              </p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="display text-[200px] md:text-[260px] text-[#c8a46b]/15 leading-none -mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                2.0
              </div>
              <div className="micro">Scroll <ArrowDown className="inline ml-1" size={12} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO AI ORB */}
      <section className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="decisional-architecture">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Architettura decisionale</Label>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="display text-5xl md:text-6xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                1 CEO AI. 5 Dirigenti AI. <span className="italic-gold">Zero attriti.</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-12">
                Una costellazione di intelligenze coordinate. Il CEO AI orchestra le decisioni strategiche; i cinque Dirigenti AI eseguono con autonomia totale nei rispettivi dipartimenti.
              </p>
              <div className="space-y-1">
                {[
                  { i: Megaphone, t: 'Direttore Marketing AI' },
                  { i: TrendingUp, t: 'Direttore Vendite AI' },
                  { i: GitBranch, t: 'Direttore Operations AI' },
                  { i: Wallet, t: 'Direttore Finanza AI' },
                  { i: Heart, t: 'Direttore Customer Care AI' },
                ].map((it, idx) => {
                  const Icon = it.i;
                  return (
                    <div key={idx} className="flex items-center gap-6 py-4 border-b border-[#1a1c1a]" data-testid={`director-${idx + 1}`}>
                      <span className="text-[#c8a46b]/50 text-[10px] font-mono tracking-wider">0{idx + 1}</span>
                      <Icon size={16} className="text-[#c8a46b]" strokeWidth={1.5} />
                      <span className="text-white text-[15px]">{it.t}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Orb diagram */}
            <div className="relative aspect-square max-w-[520px] mx-auto w-full" data-testid="ceo-ai-orb">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" fill="none">
                <circle cx="260" cy="260" r="200" stroke="#c8a46b" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
                <line x1="260" y1="260" x2="260" y2="80" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="430" y2="200" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="380" y2="420" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="140" y2="420" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="90" y2="200" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
              </svg>

              {/* CEO center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-[#c8a46b]/50 bg-[#0e0f0e] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(200,164,107,0.15)]">
                  <Crown size={24} className="text-[#c8a46b] mb-3" strokeWidth={1.5} />
                  <div className="display text-3xl text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>CEO AI</div>
                  <div className="text-[9px] tracking-[0.25em] uppercase text-[#6f716d]">Orchestrazione · Strategia</div>
                </div>
              </div>

              {/* Satellites */}
              {[
                { x: '50%', y: '12%', icon: Megaphone, label: 'Marketing' },
                { x: '88%', y: '38%', icon: TrendingUp, label: 'Vendite' },
                { x: '75%', y: '85%', icon: GitBranch, label: 'Operations' },
                { x: '25%', y: '85%', icon: Wallet, label: 'Finanza' },
                { x: '12%', y: '38%', icon: Heart, label: 'Customer Care' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: s.x, top: s.y }} data-testid={`satellite-${s.label.toLowerCase().replace(' ', '-')}`}>
                    <div className="w-14 h-14 rounded-full border border-[#c8a46b]/40 bg-[#0e0f0e] flex items-center justify-center mb-2 mx-auto">
                      <Icon size={16} className="text-[#c8a46b]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#9a9a96] whitespace-nowrap">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 13 PILLARS */}
      <section id="pilastri" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="pillars-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Fondamenta</Label>
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
            <h2 className="display text-5xl md:text-7xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              I <span className="italic-gold">13 Pilastri</span> dell'AI Factory.
            </h2>
            <div>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-8">
                Ogni pilastro è un sotto-sistema autonomo. Insieme, formano l'architettura di un'azienda che opera senza intervento umano sui processi ripetibili.
              </p>
              <div className="display text-9xl text-[#c8a46b]/15 leading-none text-right" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>13</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#1a1c1a]">
            {pillars.map((p) => (
              <Pillar key={p.n} num={p.n} icon={p.i} title={p.t} desc={p.d} />
            ))}
            {/* Infinity card */}
            <div className="bg-gradient-to-br from-[#c8a46b]/10 via-[#131413] to-[#0e0f0e] border border-[#c8a46b]/30 p-6 flex flex-col justify-between" data-testid="pillar-infinity">
              <div className="display text-7xl text-[#c8a46b] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>∞</div>
              <div>
                <h3 className="font-serif text-xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Sistema Unico</h3>
                <p className="text-[#7a7c78] text-sm leading-relaxed">Tutti i pilastri operano come un'unica intelligenza coordinata.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIANI ZANE */}
      <section id="piani-zane" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="zane-plans-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Piani Zane</Label>
          <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
            <h2 className="display text-5xl md:text-7xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              Tre piani. Tre livelli di <span className="italic-gold">attrito eliminato.</span>
            </h2>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              Zane scala con la complessità che vuoi delegare. Da scudo personale per il founder, a partner che potenzia il team operativo, fino a bussola strategica per navigare la complessità aziendale. Tutti i prezzi sono in CHF, IVA esclusa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-[#1a1c1a]">
            {zanePlans.map((p) => (
              <div
                key={p.id}
                className={`bg-[#0e0f0e] p-10 ${p.featured ? 'lg:-mt-6 lg:pt-16 lg:border-t lg:border-[#c8a46b] bg-gradient-to-b from-[#c8a46b]/[0.04] to-[#0e0f0e] relative' : ''}`}
                data-testid={`zane-plan-${p.id}`}
              >
                {p.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold whitespace-nowrap">
                    ✦ Più scelto
                  </div>
                )}
                <h3 className="display text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {p.name}
                </h3>
                <p className="italic-gold text-sm italic mb-6 leading-relaxed">{p.tagline}</p>
                <div className="text-[9px] tracking-[0.22em] uppercase text-[#6f716d] mb-8 leading-relaxed">
                  {p.audience}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="display text-6xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{p.price}</span>
                  <span className="text-[#9a9a96] text-sm">CHF/mese</span>
                </div>
                <div className="text-[#6f716d] text-xs mb-10">{p.setup}</div>
                <div className="dotted-line mb-8"></div>
                <p className="text-[#9a9a96] text-sm leading-relaxed mb-8">{p.description}</p>
                <ul className="space-y-3 mb-10">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                      <Check size={13} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setForm((prev) => ({ ...prev, interest: 'zane' }));
                    scrollTo('contatto');
                  }}
                  className={p.featured ? 'btn-gold w-full justify-center' : 'btn-outline w-full justify-center'}
                  data-testid={`select-${p.id}`}
                >
                  Scegli {p.name.replace('Zane ', '')} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-[#6f716d] text-sm mt-12 max-w-2xl leading-relaxed">
            Tutti i piani includono fatturazione mensile, possibilità di upgrade in qualsiasi momento e cancellazione con 30 giorni di preavviso.
          </p>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section id="roi" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="roi-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label><Building2 size={12} className="text-[#c8a46b]" /> Calcolatore di capacità strategica</Label>
          <div className="grid lg:grid-cols-2 gap-16 mb-16 items-start">
            <h2 className="display text-4xl md:text-6xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              Quanta energia ti sta rubando <span className="italic-gold">l'attrito operativo?</span>
            </h2>
            <p className="text-[#9a9a96] text-base leading-relaxed">
              Inserisci due numeri. Calcoliamo quanto tempo e quanta capacità strategica il tuo team potrebbe restituire all'attività ad alto valore — usando il costo medio orario di mercato (CHF 55/ora fully loaded, 220 giornate lavorative).
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[#1a1c1a]">
            <div className="bg-[#0e0f0e] p-10 md:p-14">
              <div className="micro mb-3">Punto di partenza</div>
              <div className="dotted-line mb-12"></div>
              <label className="block">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#9a9a96] mb-6">Numero di persone nel team operativo</div>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={roiPeople}
                  onChange={(e) => setRoiPeople(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="bg-transparent border-none w-full display text-7xl text-white outline-none focus:text-[#c8a46b] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  data-testid="roi-input-people"
                />
              </label>
              <div className="dotted-line mt-8"></div>
              <p className="text-[#6f716d] text-xs mt-6 leading-relaxed">
                Considera tutte le persone del team che svolgono attività ripetitive ad alto attrito (email, follow-up, coordinamento, reportistica).
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#c8a46b]/[0.06] to-[#0e0f0e] p-10 md:p-14 relative" data-testid="roi-result">
              <div className="micro mb-3 text-[#c8a46b]"><TrendingUp size={12} className="inline mr-2" />Capacità strategica recuperata · valore annuo</div>
              <div className="dotted-line mb-12"></div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="display text-7xl md:text-8xl text-[#c8a46b]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {roiAnnual}
                </span>
                <span className="display text-2xl text-[#c8a46b]/70" style={{ fontFamily: "'Cormorant Garamond', serif" }}>CHF/anno</span>
              </div>
              <p className="text-[#9a9a96] text-sm leading-relaxed mt-6">
                Energia restituita al team per attività ad alto valore. Non persone licenziate: persone più libere di fare il lavoro per cui le hai assunte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLUEPRINT */}
      <section id="blueprint" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="blueprint-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Label>Blueprint tecnico</Label>
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#c8a46b] -mt-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] animate-pulse"></span> Live
            </span>
          </div>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            L'anatomia di un'<span className="italic-gold">AI Factory.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Niente case study patinati. Niente testimonianze. Qui mostriamo l'architettura tecnica che costruiamo per ogni cliente. Un sistema reale, non una promessa.
          </p>

          <div className="space-y-px bg-[#1a1c1a]">
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
                icon: Network,
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
                icon: Boxes,
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
                <div key={layer.layer} className="bg-[#0e0f0e] p-10 md:p-14" data-testid={`blueprint-${layer.layer.toLowerCase()}`}>
                  <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                      <div className="micro mb-6 text-[#c8a46b]">· Layer {layer.layer}</div>
                      <Icon size={28} className="text-[#c8a46b] mb-6" strokeWidth={1.5} />
                      <h3 className="display text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                        {layer.title}
                      </h3>
                      <p className="italic-gold text-sm italic mb-6">{layer.subtitle}</p>
                      <p className="text-[#9a9a96] text-sm leading-relaxed">{layer.desc}</p>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="micro mb-6">Componenti</div>
                      <ul className="space-y-3">
                        {layer.components.map((c, i) => (
                          <li key={i} className="flex items-start gap-4 text-sm text-white/90 py-2 border-b border-[#1a1c1a]">
                            <span className="text-[#c8a46b]/60 text-[10px] font-mono mt-1 w-5">0{i + 1}</span>
                            <span className="text-[#6f716d] mt-1">—</span>
                            <span className="flex-1">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                      {layer.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="display text-5xl text-[#c8a46b] mb-1 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                            {m.v}
                          </div>
                          <div className="text-[9px] tracking-[0.22em] uppercase text-[#6f716d]">{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stack */}
          <div className="mt-12 bg-[#0e0f0e] border border-[#222421] p-10 md:p-14" data-testid="tech-stack">
            <div className="micro mb-8">Stack tecnologico</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
              {[
                ['LLM frontier', 'GPT / Claude / Gemini'],
                ['Vector DB', 'Memoria contestuale'],
                ['Orchestration', 'Agent framework proprietario'],
                ['Observability', 'Logging + tracing end-to-end'],
                ['Infrastructure', 'Cloud svizzero / EU'],
                ['Security', 'SOC2-ready, GDPR-native'],
              ].map(([k, v], i) => (
                <div key={i} className="flex items-center justify-between gap-4 pb-4 border-b border-[#1a1c1a]">
                  <span className="text-white text-sm font-medium">{k}</span>
                  <span className="text-[#9a9a96] text-xs text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Principle quote */}
          <div className="mt-16 bg-[#0e0f0e] border border-[#222421] p-10 md:p-14 max-w-3xl">
            <div className="micro mb-6 text-[#c8a46b]"><ShieldCheck size={12} className="inline mr-2" />Principio operativo</div>
            <blockquote>
              <p className="display text-2xl md:text-3xl text-white/95 italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                "Mostriamo come è costruito. Non chiediamo di crederci sulla parola."
              </p>
              <footer className="micro mt-8">Arxeon · Engineering</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* STRATEGIC MODEL */}
      <section id="strategia" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="strategy-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>Modello strategico</Label>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            High-Ticket. Volume automatizzato. <span className="italic-gold">Equilibrio svizzero.</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">
            Arxeon non è solo automazione. È un modello strategico che bilancia l'esclusività high-ticket con l'efficienza dei volumi gestiti dall'IA.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-[#1a1c1a]">
            {[
              {
                t: 'Esclusività High-Ticket',
                d: 'Posizionamento premium, prezzi difesi, clienti selezionati. L\'IA non comprime i ricavi: difende il margine unitario.',
              },
              {
                t: 'Volume Automatizzato',
                d: 'L\'IA assorbe i picchi operativi che farebbero collassare un team umano. Scali senza burnout, senza turnover, senza l\'ansia delle nuove assunzioni.',
              },
              {
                t: 'Output Costante',
                d: 'Processi standardizzati, governance rigorosa, qualità prevedibile su ogni transazione. Niente giornate storte, niente errori per stanchezza.',
              },
              {
                t: 'Energia Restituita',
                d: 'Il founder e il team tornano sul lavoro che hanno scelto: relazioni, visione, decisioni strategiche. L\'IA assorbe il rumore quotidiano.',
              },
            ].map((p, i) => (
              <div key={i} className="bg-[#0e0f0e] p-10 md:p-14" data-testid={`strategy-${i + 1}`}>
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="display text-5xl text-[#c8a46b]/30" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="display text-3xl md:text-4xl text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {p.t}
                </h3>
                <p className="text-[#9a9a96] text-[15px] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contatto" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="contact-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Label>Consultazione strategica</Label>
              <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Inizia la <span className="italic-gold">trasformazione.</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-12">
                Una conversazione riservata di 45 minuti con il team Arxeon. Valutiamo il fit, mappiamo il bottleneck principale, definiamo il percorso.
              </p>
              <div className="space-y-px bg-[#1a1c1a]">
                {[
                  { v: '45\'', l: 'Consultazione riservata' },
                  { v: '24h', l: 'Risposta garantita' },
                  { v: '1:1', l: 'Con il team Arxeon' },
                ].map((it, i) => (
                  <div key={i} className="bg-[#0a0b0a] flex items-baseline gap-6 py-6 px-2">
                    <div className="display text-3xl text-[#c8a46b] min-w-[70px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                      {it.v}
                    </div>
                    <div className="text-[#9a9a96] text-sm">{it.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-[#0e0f0e] border border-[#222421] p-10 md:p-14 space-y-10" data-testid="elite-consultation-form">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                  <div>
                    <label className="micro block mb-3">Nome <span className="text-[#c8a46b]">*</span></label>
                    <input type="text" name="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-elite" placeholder="Mario Rossi" data-testid="input-fullname" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">Azienda <span className="text-[#c8a46b]">*</span></label>
                    <input type="text" name="companyName" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="input-elite" placeholder="La tua società" data-testid="input-company" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">Email <span className="text-[#c8a46b]">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-elite" placeholder="tu@azienda.com" data-testid="input-email" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">Telefono</label>
                    <input type="tel" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-elite" placeholder="+39 ..." data-testid="input-phone" />
                  </div>
                </div>

                <div>
                  <label className="micro block mb-5">Livello di interesse</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'custom_ai_apps', label: 'Custom AI Apps' },
                      { id: 'zane', label: 'Zane' },
                      { id: 'elite_2', label: 'Arxeon Elite 2.0' },
                      { id: 'tbd', label: 'Da definire' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, interest: opt.id }))}
                        className={`px-5 py-3 text-[10px] tracking-[0.22em] uppercase font-medium transition-all border ${
                          form.interest === opt.id
                            ? 'bg-[#c8a46b] text-[#0a0b0a] border-[#c8a46b]'
                            : 'bg-transparent text-[#9a9a96] border-[#2a2c2a] hover:border-[#c8a46b] hover:text-[#c8a46b]'
                        }`}
                        data-testid={`interest-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="micro block mb-3">Contesto <span className="text-[#5a5c58] normal-case tracking-normal">(opzionale)</span></label>
                  <textarea name="context" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} rows={3} className="input-elite resize-none" placeholder="Cosa vorresti automatizzare per primo?" data-testid="input-context" />
                </div>

                <div className="pt-6 border-t border-[#222421] flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                  <p className="text-[#6f716d] text-xs leading-relaxed max-w-sm">
                    I tuoi dati sono trattati con riservatezza assoluta. Nessuna terza parte.
                  </p>
                  <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed" data-testid="submit-consultation">
                    {submitting ? (
                      <><Loader2 size={14} className="animate-spin" /> Invio...</>
                    ) : (
                      <>Prenota consultazione <ArrowRight size={14} /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1c1a] py-20" data-testid="elite-footer">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <span className="display text-3xl md:text-4xl text-white tracking-[0.12em]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  ARXEON
                </span>
                <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">Elite</span>
              </div>
              <p className="italic-gold italic text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                L'Azienda che si gestisce da sola.
              </p>
              <p className="text-[#9a9a96] text-sm leading-relaxed max-w-md mb-10">
                AI Factory · Lo scudo operativo che assorbe la complessità e libera il team per il valore strategico.
              </p>
              <Link to="/" className="link-gold" data-testid="footer-arxeon-link">
                Arxeon.ch (sito principale) <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="micro mb-6">Prodotti</div>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo('valore')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Custom AI Apps</button></li>
                <li><button onClick={() => scrollTo('piani-zane')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Zane</button></li>
                <li><button onClick={() => scrollTo('architettura')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Arxeon Elite 2.0</button></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <div className="micro mb-6">Azienda</div>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo('architettura')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Architettura</button></li>
                <li><button onClick={() => scrollTo('blueprint')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Blueprint Tecnico</button></li>
                <li><button onClick={() => scrollTo('strategia')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Strategia</button></li>
                <li><button onClick={() => scrollTo('contatto')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">Consultazione</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1a1c1a] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] tracking-[0.22em] uppercase text-[#6f716d]">
            <div>© 2026 Arxeon · Tutti i diritti riservati.</div>
            <div className="flex items-center gap-3">
              <span>B2B</span><span className="text-[#3a3c38]">·</span>
              <span><span className="text-[#c8a46b]">IT</span> / FR</span>
              <span className="text-[#3a3c38]">·</span>
              <span>Arxeon Elite</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Elite;
