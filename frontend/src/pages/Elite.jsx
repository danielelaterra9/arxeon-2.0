import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'it').substring(0, 2);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('arxeon-lang', code);
  };

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
      toast.error(t('elite.contact.err_required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t('elite.contact.err_email'));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/elite-consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: currentLang }),
      });
      if (!res.ok) throw new Error('error');
      toast.success(t('elite.contact.ok_sent'));
      setForm({ fullName: '', companyName: '', email: '', phone: '', interest: 'tbd', context: '' });
    } catch {
      toast.error(t('elite.contact.err_send'));
    } finally {
      setSubmitting(false);
    }
  };

  const pillars = [
    { n: 1, i: TrendingUp, key: 'p1' },
    { n: 2, i: Target, key: 'p2' },
    { n: 3, i: MessageSquare, key: 'p3' },
    { n: 4, i: Settings, key: 'p4' },
    { n: 5, i: PieChart, key: 'p5' },
    { n: 6, i: Database, key: 'p6' },
    { n: 7, i: Sparkles, key: 'p7' },
    { n: 8, i: PenTool, key: 'p8' },
    { n: 9, i: Users, key: 'p9' },
    { n: 10, i: Activity, key: 'p10' },
    { n: 11, i: ShieldCheck, key: 'p11' },
    { n: 12, i: ShoppingCart, key: 'p12' },
    { n: 13, i: UserPlus, key: 'p13' },
  ];

  const zanePlans = [
    { id: 'lite', price: '78', featured: false },
    { id: 'business', price: '780', featured: true },
    { id: 'elite', price: "5'000", featured: false },
  ];

  const navBadges = t('elite.nav.badges', { returnObjects: true });

  return (
    <main className="bg-[#0a0b0a] text-white elite-page min-h-screen" data-testid="elite-page">
      <style>{`
        .elite-page {
          --gold: #c8a46b;
          --gold-bright: #d4b681;
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
              ← {t('elite.nav.back')}
            </Link>
            <div className="text-[#6f716d] hidden sm:flex items-center gap-3">
              {Array.isArray(navBadges) && navBadges.map((b, i) => (
                <React.Fragment key={i}>
                  <span>{b}</span>
                  {i < navBadges.length - 1 && <span className="text-[#3a3c38]">·</span>}
                </React.Fragment>
              ))}
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
              <button onClick={() => scrollTo('valore')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-valore">{t('elite.nav.valore')}</button>
              <button onClick={() => scrollTo('architettura')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-architettura">{t('elite.nav.architettura')}</button>
              <button onClick={() => scrollTo('pilastri')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-pilastri">{t('elite.nav.pilastri')}</button>
              <button onClick={() => scrollTo('blueprint')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-blueprint">{t('elite.nav.blueprint')}</button>
              <button onClick={() => scrollTo('strategia')} className="hover:text-[#c8a46b] transition-colors underline underline-offset-8 decoration-[#c8a46b]/30" data-testid="nav-strategia">{t('elite.nav.strategia')}</button>
            </nav>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase">
                <button
                  onClick={() => changeLang('it')}
                  className={`transition-colors px-1 py-1 ${currentLang === 'it' ? 'text-[#c8a46b]' : 'text-[#6f716d] hover:text-white'}`}
                  data-testid="lang-it"
                >
                  IT
                </button>
                <span className="text-[#3a3c38]">·</span>
                <button
                  onClick={() => changeLang('fr')}
                  className={`transition-colors px-1 py-1 ${currentLang === 'fr' ? 'text-[#c8a46b]' : 'text-[#6f716d] hover:text-white'}`}
                  data-testid="lang-fr"
                >
                  FR
                </button>
              </div>
              <button onClick={() => scrollTo('contatto')} className="btn-outline !py-3 !px-5" data-testid="cta-consultazione-top">
                {t('elite.nav.consultazione')} <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40" data-testid="hero-section">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 1200px 600px at 60% 50%, rgba(200,164,107,0.06), transparent 70%)' }}></div>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative">
          <Label>{t('elite.hero.label')}</Label>
          <h1 className="display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.95] mb-12 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {t('elite.hero.title_1')} <span className="italic-gold">{t('elite.hero.title_em')}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9a9a96] max-w-2xl leading-relaxed mb-14">
            {t('elite.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 mb-24">
            <button onClick={() => scrollTo('contatto')} className="btn-gold" data-testid="cta-consultazione-hero">
              {t('elite.hero.cta_primary')} <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo('valore')} className="btn-outline" data-testid="cta-soluzioni">
              {t('elite.hero.cta_secondary')}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl">
            <Stat value="15" label={t('elite.stats.s1_label')} />
            <Stat value="30+" label={t('elite.stats.s2_label')} />
            <Stat value="−40%" label={t('elite.stats.s3_label')} />
            <Stat value="24/7" label={t('elite.stats.s4_label')} />
          </div>

          <div className="mt-20 flex flex-col items-center text-[#6f716d]">
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3">{t('elite.hero.scroll')}</div>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* VALUE LADDER */}
      <section id="valore" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="value-ladder-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.value.label')}</Label>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-6 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {t('elite.value.title_1')} <span className="italic-gold">{t('elite.value.title_em')}</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">{t('elite.value.subtitle')}</p>

          <div className="grid lg:grid-cols-2 gap-px bg-[#1a1c1a]">
            {/* Custom AI Apps */}
            <div className="bg-[#0e0f0e] p-10 md:p-14" data-testid="card-custom-ai-apps">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">{t('elite.value.apps.badge')}</span>
                <span className="micro">{t('elite.value.apps.level')}</span>
              </div>
              <h3 className="display text-4xl md:text-5xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t('elite.value.apps.name')}</h3>
              <p className="italic-gold text-base mb-8 italic">{t('elite.value.apps.tagline')}</p>
              <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">{t('elite.value.apps.desc')}</p>
              <ul className="space-y-4 mb-10">
                {['f1', 'f2', 'f3'].map((f) => (
                  <li key={f} className="flex items-start gap-4 text-white/90 text-sm">
                    <Check size={14} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t(`elite.value.apps.${f}`)}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('roi')} className="btn-gold" data-testid="cta-custom-ai-apps">
                {t('elite.value.apps.cta')} <ArrowRight size={14} />
              </button>
            </div>

            {/* Zane */}
            <div className="bg-[#0e0f0e] p-10 md:p-14 relative" data-testid="card-zane">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#c8a46b] text-[#0a0b0a] text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">{t('elite.value.zane.badge')}</span>
                <span className="micro">{t('elite.value.zane.level')}</span>
              </div>
              <h3 className="display text-4xl md:text-5xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t('elite.value.zane.name')}</h3>
              <p className="italic-gold text-base mb-8 italic">{t('elite.value.zane.tagline')}</p>
              <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">{t('elite.value.zane.desc')}</p>
              <ul className="space-y-4 mb-10">
                {['f1', 'f2', 'f3', 'f4'].map((f) => (
                  <li key={f} className="flex items-start gap-4 text-white/90 text-sm">
                    <Check size={14} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t(`elite.value.zane.${f}`)}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('piani-zane')} className="btn-gold" data-testid="cta-zane">
                {t('elite.value.zane.cta')} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* L'UPGRADE DEFINITIVO */}
      <section className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="upgrade-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.upgrade.label')}</Label>
          <div className="border border-[#222421] bg-gradient-to-br from-[#131413] to-[#0e0f0e]">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-[#222421]">
                <div className="flex items-center gap-2 micro mb-8">
                  <Building2 size={14} className="text-[#c8a46b]" /> · {t('elite.upgrade.level')}
                </div>
                <h3 className="display text-5xl md:text-6xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t('elite.upgrade.name')}</h3>
                <p className="italic-gold text-lg mb-12 italic">{t('elite.upgrade.tagline')}</p>
              </div>
              <div className="p-10 md:p-16">
                <p className="text-[#9a9a96] text-[15px] leading-relaxed mb-10">{t('elite.upgrade.desc')}</p>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {['p1', 'p2', 'p3', 'p4'].map((p, i) => (
                    <div key={p} className="flex items-start gap-4">
                      <span className="text-[#c8a46b] text-[10px] font-mono tracking-wider mt-1">0{i + 1}</span>
                      <span className="text-white/90 text-sm leading-relaxed">{t(`elite.upgrade.${p}`)}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo('architettura')} className="link-gold" data-testid="cta-explore-ai-factory">
                  {t('elite.upgrade.cta')} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITETTURA INTRO */}
      <section id="architettura" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="architecture-intro">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.architettura.label')}</Label>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {t('elite.architettura.title_1')}<span className="italic-gold">{t('elite.architettura.title_em')}</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed max-w-3xl">{t('elite.architettura.desc')}</p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="display text-[200px] md:text-[260px] text-[#c8a46b]/15 leading-none -mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                2.0
              </div>
              <div className="micro">{t('elite.hero.scroll')} <ArrowDown className="inline ml-1" size={12} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO AI ORB */}
      <section className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="decisional-architecture">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.decisional.label')}</Label>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="display text-5xl md:text-6xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {t('elite.decisional.title_1')} <span className="italic-gold">{t('elite.decisional.title_em')}</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-12">{t('elite.decisional.desc')}</p>
              <div className="space-y-1">
                {[
                  { i: Megaphone, k: 'dir1' },
                  { i: TrendingUp, k: 'dir2' },
                  { i: GitBranch, k: 'dir3' },
                  { i: Wallet, k: 'dir4' },
                  { i: Heart, k: 'dir5' },
                ].map((it, idx) => {
                  const Icon = it.i;
                  return (
                    <div key={idx} className="flex items-center gap-6 py-4 border-b border-[#1a1c1a]" data-testid={`director-${idx + 1}`}>
                      <span className="text-[#c8a46b]/50 text-[10px] font-mono tracking-wider">0{idx + 1}</span>
                      <Icon size={16} className="text-[#c8a46b]" strokeWidth={1.5} />
                      <span className="text-white text-[15px]">{t(`elite.decisional.${it.k}`)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Orb */}
            <div className="relative aspect-square max-w-[520px] mx-auto w-full" data-testid="ceo-ai-orb">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" fill="none">
                <circle cx="260" cy="260" r="200" stroke="#c8a46b" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
                <line x1="260" y1="260" x2="260" y2="80" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="430" y2="200" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="380" y2="420" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="140" y2="420" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="260" y1="260" x2="90" y2="200" stroke="#c8a46b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-[#c8a46b]/50 bg-[#0e0f0e] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(200,164,107,0.15)]">
                  <Crown size={24} className="text-[#c8a46b] mb-3" strokeWidth={1.5} />
                  <div className="display text-3xl text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t('elite.decisional.ceo')}</div>
                  <div className="text-[9px] tracking-[0.25em] uppercase text-[#6f716d] text-center px-3">{t('elite.decisional.ceo_sub')}</div>
                </div>
              </div>

              {[
                { x: '50%', y: '12%', icon: Megaphone, k: 'sat1' },
                { x: '88%', y: '38%', icon: TrendingUp, k: 'sat2' },
                { x: '75%', y: '85%', icon: GitBranch, k: 'sat3' },
                { x: '25%', y: '85%', icon: Wallet, k: 'sat4' },
                { x: '12%', y: '38%', icon: Heart, k: 'sat5' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: s.x, top: s.y }} data-testid={`satellite-${i + 1}`}>
                    <div className="w-14 h-14 rounded-full border border-[#c8a46b]/40 bg-[#0e0f0e] flex items-center justify-center mb-2 mx-auto">
                      <Icon size={16} className="text-[#c8a46b]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#9a9a96] whitespace-nowrap">{t(`elite.decisional.${s.k}`)}</div>
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
          <Label>{t('elite.pillars.label')}</Label>
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
            <h2 className="display text-5xl md:text-7xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              {t('elite.pillars.title_1')} <span className="italic-gold">{t('elite.pillars.title_em')}</span> {t('elite.pillars.title_2')}
            </h2>
            <div>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-8">{t('elite.pillars.desc')}</p>
              <div className="display text-9xl text-[#c8a46b]/15 leading-none text-right" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>13</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#1a1c1a]">
            {pillars.map((p) => (
              <Pillar key={p.n} num={p.n} icon={p.i} title={t(`elite.pillars.${p.key}_t`)} desc={t(`elite.pillars.${p.key}_d`)} />
            ))}
            <div className="bg-gradient-to-br from-[#c8a46b]/10 via-[#131413] to-[#0e0f0e] border border-[#c8a46b]/30 p-6 flex flex-col justify-between" data-testid="pillar-infinity">
              <div className="display text-7xl text-[#c8a46b] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>∞</div>
              <div>
                <h3 className="font-serif text-xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t('elite.pillars.infinity_title')}</h3>
                <p className="text-[#7a7c78] text-sm leading-relaxed">{t('elite.pillars.infinity_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIANI ZANE */}
      <section id="piani-zane" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="zane-plans-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.zanePlans.label')}</Label>
          <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
            <h2 className="display text-5xl md:text-7xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              {t('elite.zanePlans.title_1')} <span className="italic-gold">{t('elite.zanePlans.title_em')}</span>
            </h2>
            <p className="text-[#9a9a96] text-lg leading-relaxed">{t('elite.zanePlans.desc')}</p>
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
                    {t('elite.zanePlans.featured_badge')}
                  </div>
                )}
                <h3 className="display text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {t(`elite.zanePlans.${p.id}.name`)}
                </h3>
                <p className="italic-gold text-sm italic mb-6 leading-relaxed">{t(`elite.zanePlans.${p.id}.tagline`)}</p>
                <div className="text-[9px] tracking-[0.22em] uppercase text-[#6f716d] mb-8 leading-relaxed">
                  {t(`elite.zanePlans.${p.id}.audience`)}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="display text-6xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{p.price}</span>
                  <span className="text-[#9a9a96] text-sm">{t('elite.zanePlans.currency_period')}</span>
                </div>
                <div className="text-[#6f716d] text-xs mb-10">{t(`elite.zanePlans.${p.id}.setup`)}</div>
                <div className="dotted-line mb-8"></div>
                <p className="text-[#9a9a96] text-sm leading-relaxed mb-8">{t(`elite.zanePlans.${p.id}.desc`)}</p>
                <ul className="space-y-3 mb-10">
                  {['f1', 'f2', 'f3', 'f4', 'f5'].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/90">
                      <Check size={13} className="text-[#c8a46b] flex-shrink-0 mt-1" strokeWidth={2.5} />
                      <span>{t(`elite.zanePlans.${p.id}.${f}`)}</span>
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
                  {t('elite.zanePlans.select')} {t(`elite.zanePlans.${p.id}.name`).replace('Zane ', '')} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-[#6f716d] text-sm mt-12 max-w-2xl leading-relaxed">{t('elite.zanePlans.footer_note')}</p>
        </div>
      </section>

      {/* ROI */}
      <section id="roi" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="roi-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label><Building2 size={12} className="text-[#c8a46b]" /> {t('elite.roi.label')}</Label>
          <div className="grid lg:grid-cols-2 gap-16 mb-16 items-start">
            <h2 className="display text-4xl md:text-6xl text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              {t('elite.roi.title_1')} <span className="italic-gold">{t('elite.roi.title_em')}</span>
            </h2>
            <p className="text-[#9a9a96] text-base leading-relaxed">{t('elite.roi.desc')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[#1a1c1a]">
            <div className="bg-[#0e0f0e] p-10 md:p-14">
              <div className="micro mb-3">{t('elite.roi.input_label')}</div>
              <div className="dotted-line mb-12"></div>
              <label className="block">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#9a9a96] mb-6">{t('elite.roi.input_field')}</div>
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
              <p className="text-[#6f716d] text-xs mt-6 leading-relaxed">{t('elite.roi.input_hint')}</p>
            </div>

            <div className="bg-gradient-to-br from-[#c8a46b]/[0.06] to-[#0e0f0e] p-10 md:p-14 relative" data-testid="roi-result">
              <div className="micro mb-3 text-[#c8a46b]"><TrendingUp size={12} className="inline mr-2" />{t('elite.roi.result_label')}</div>
              <div className="dotted-line mb-12"></div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="display text-7xl md:text-8xl text-[#c8a46b]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {roiAnnual}
                </span>
                <span className="display text-2xl text-[#c8a46b]/70" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{t('elite.roi.result_period')}</span>
              </div>
              <p className="text-[#9a9a96] text-sm leading-relaxed mt-6">{t('elite.roi.result_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLUEPRINT */}
      <section id="blueprint" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="blueprint-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Label>{t('elite.blueprint.label')}</Label>
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#c8a46b] -mt-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a46b] animate-pulse"></span> {t('elite.blueprint.live')}
            </span>
          </div>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {t('elite.blueprint.title_1')}<span className="italic-gold">{t('elite.blueprint.title_em')}</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">{t('elite.blueprint.desc')}</p>

          <div className="space-y-px bg-[#1a1c1a]">
            {[
              { layer: 'L1', icon: Layers, key: 'l1' },
              { layer: 'L2', icon: Network, key: 'l2' },
              { layer: 'L3', icon: Boxes, key: 'l3' },
            ].map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.layer} className="bg-[#0e0f0e] p-10 md:p-14" data-testid={`blueprint-${layer.layer.toLowerCase()}`}>
                  <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                      <div className="micro mb-6 text-[#c8a46b]">· Layer {layer.layer}</div>
                      <Icon size={28} className="text-[#c8a46b] mb-6" strokeWidth={1.5} />
                      <h3 className="display text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{t(`elite.blueprint.${layer.key}_title`)}</h3>
                      <p className="italic-gold text-sm italic mb-6">{t(`elite.blueprint.${layer.key}_sub`)}</p>
                      <p className="text-[#9a9a96] text-sm leading-relaxed">{t(`elite.blueprint.${layer.key}_desc`)}</p>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="micro mb-6">{t('elite.blueprint.components')}</div>
                      <ul className="space-y-3">
                        {['c1', 'c2', 'c3', 'c4', 'c5'].map((c, i) => (
                          <li key={c} className="flex items-start gap-4 text-sm text-white/90 py-2 border-b border-[#1a1c1a]">
                            <span className="text-[#c8a46b]/60 text-[10px] font-mono mt-1 w-5">0{i + 1}</span>
                            <span className="text-[#6f716d] mt-1">—</span>
                            <span className="flex-1">{t(`elite.blueprint.${layer.key}_${c}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                      {[
                        { v: layer.key === 'l1' ? '< 60s' : layer.key === 'l2' ? '24/7' : '13', l: `${layer.key}_m1_l` },
                        { v: layer.key === 'l1' ? '94%' : layer.key === 'l2' ? 'n+1' : '99.5%', l: `${layer.key}_m2_l` },
                      ].map((m, i) => (
                        <div key={i}>
                          <div className="display text-5xl text-[#c8a46b] mb-1 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                            {m.v}
                          </div>
                          <div className="text-[9px] tracking-[0.22em] uppercase text-[#6f716d]">{t(`elite.blueprint.${m.l}`)}</div>
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
            <div className="micro mb-8">{t('elite.blueprint.stack_label')}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
              {['llm', 'vdb', 'orc', 'obs', 'inf', 'sec'].map((s) => (
                <div key={s} className="flex items-center justify-between gap-4 pb-4 border-b border-[#1a1c1a]">
                  <span className="text-white text-sm font-medium">{t(`elite.blueprint.stack.${s}_k`)}</span>
                  <span className="text-[#9a9a96] text-xs text-right">{t(`elite.blueprint.stack.${s}_v`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Principle */}
          <div className="mt-16 bg-[#0e0f0e] border border-[#222421] p-10 md:p-14 max-w-3xl">
            <div className="micro mb-6 text-[#c8a46b]"><ShieldCheck size={12} className="inline mr-2" />{t('elite.blueprint.principle_label')}</div>
            <blockquote>
              <p className="display text-2xl md:text-3xl text-white/95 italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                "{t('elite.blueprint.principle_quote')}"
              </p>
              <footer className="micro mt-8">{t('elite.blueprint.principle_author')}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* STRATEGIA */}
      <section id="strategia" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="strategy-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Label>{t('elite.strategy.label')}</Label>
          <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8 max-w-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {t('elite.strategy.title_1')} <span className="italic-gold">{t('elite.strategy.title_em')}</span>
          </h2>
          <p className="text-[#9a9a96] text-lg max-w-3xl mb-20 leading-relaxed">{t('elite.strategy.desc')}</p>

          <div className="grid md:grid-cols-2 gap-px bg-[#1a1c1a]">
            {['s1', 's2', 's3', 's4'].map((s, i) => (
              <div key={s} className="bg-[#0e0f0e] p-10 md:p-14" data-testid={`strategy-${i + 1}`}>
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="display text-5xl text-[#c8a46b]/30" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>0{i + 1}</span>
                </div>
                <h3 className="display text-3xl md:text-4xl text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {t(`elite.strategy.${s}_t`)}
                </h3>
                <p className="text-[#9a9a96] text-[15px] leading-relaxed">{t(`elite.strategy.${s}_d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contatto" className="py-24 md:py-32 border-t border-[#1a1c1a]" data-testid="contact-section">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Label>{t('elite.contact.label')}</Label>
              <h2 className="display text-5xl md:text-7xl text-white leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {t('elite.contact.title_1')} <span className="italic-gold">{t('elite.contact.title_em')}</span>
              </h2>
              <p className="text-[#9a9a96] text-lg leading-relaxed mb-12">{t('elite.contact.desc')}</p>
              <div className="space-y-px bg-[#1a1c1a]">
                {['info1', 'info2', 'info3'].map((k) => (
                  <div key={k} className="bg-[#0a0b0a] flex items-baseline gap-6 py-6 px-2">
                    <div className="display text-3xl text-[#c8a46b] min-w-[70px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                      {t(`elite.contact.${k}_v`)}
                    </div>
                    <div className="text-[#9a9a96] text-sm">{t(`elite.contact.${k}_l`)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-[#0e0f0e] border border-[#222421] p-10 md:p-14 space-y-10" data-testid="elite-consultation-form">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                  <div>
                    <label className="micro block mb-3">{t('elite.contact.f_name')} <span className="text-[#c8a46b]">*</span></label>
                    <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-elite" placeholder="Mario Rossi" data-testid="input-fullname" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">{t('elite.contact.f_company')} <span className="text-[#c8a46b]">*</span></label>
                    <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="input-elite" placeholder="—" data-testid="input-company" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">{t('elite.contact.f_email')} <span className="text-[#c8a46b]">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-elite" placeholder="—" data-testid="input-email" required />
                  </div>
                  <div>
                    <label className="micro block mb-3">{t('elite.contact.f_phone')}</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-elite" placeholder="+41 ..." data-testid="input-phone" />
                  </div>
                </div>

                <div>
                  <label className="micro block mb-5">{t('elite.contact.f_interest_label')}</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'custom_ai_apps', k: 'f_int_apps' },
                      { id: 'zane', k: 'f_int_zane' },
                      { id: 'elite_2', k: 'f_int_elite' },
                      { id: 'tbd', k: 'f_int_tbd' },
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
                        {t(`elite.contact.${opt.k}`)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="micro block mb-3">{t('elite.contact.f_context')} <span className="text-[#5a5c58] normal-case tracking-normal">{t('elite.contact.f_optional')}</span></label>
                  <textarea value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} rows={3} className="input-elite resize-none" placeholder={t('elite.contact.f_context_ph')} data-testid="input-context" />
                </div>

                <div className="pt-6 border-t border-[#222421] flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                  <p className="text-[#6f716d] text-xs leading-relaxed max-w-sm">{t('elite.contact.f_privacy')}</p>
                  <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed" data-testid="submit-consultation">
                    {submitting ? (
                      <><Loader2 size={14} className="animate-spin" /> {t('elite.contact.f_submitting')}</>
                    ) : (
                      <>{t('elite.contact.f_submit')} <ArrowRight size={14} /></>
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
                {t('elite.footer.tagline')}
              </p>
              <p className="text-[#9a9a96] text-sm leading-relaxed max-w-md mb-10">
                {t('elite.footer.desc')}
              </p>
              <Link to="/" className="link-gold" data-testid="footer-arxeon-link">
                {t('elite.footer.main_site')} <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="micro mb-6">{t('elite.footer.prodotti')}</div>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo('valore')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.p_apps')}</button></li>
                <li><button onClick={() => scrollTo('piani-zane')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.p_zane')}</button></li>
                <li><button onClick={() => scrollTo('architettura')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.p_elite')}</button></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <div className="micro mb-6">{t('elite.footer.azienda')}</div>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo('architettura')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.a_arch')}</button></li>
                <li><button onClick={() => scrollTo('blueprint')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.a_blue')}</button></li>
                <li><button onClick={() => scrollTo('strategia')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.a_strat')}</button></li>
                <li><button onClick={() => scrollTo('contatto')} className="text-[#9a9a96] hover:text-[#c8a46b] text-sm transition-colors">{t('elite.footer.a_cons')}</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1a1c1a] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] tracking-[0.22em] uppercase text-[#6f716d]">
            <div>{t('elite.footer.rights')}</div>
            <div className="flex items-center gap-3">
              <span>B2B</span><span className="text-[#3a3c38]">·</span>
              <button onClick={() => changeLang('it')} className={currentLang === 'it' ? 'text-[#c8a46b]' : 'hover:text-white transition-colors'}>IT</button>
              <span>/</span>
              <button onClick={() => changeLang('fr')} className={currentLang === 'fr' ? 'text-[#c8a46b]' : 'hover:text-white transition-colors'}>FR</button>
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
