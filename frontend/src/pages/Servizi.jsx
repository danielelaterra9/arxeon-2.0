import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const Servizi = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Handle scroll to anchor on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const comparisonData = [
    { label: t('services.comparison.frequency'), basic: '1 al mese', premium: '1 al mese', gold: '2 al mese' },
    { label: t('services.comparison.consultations'), basic: '1 call/mese (20-40 min)', premium: '2 call/mese (20-40 min)', gold: 'Supervisione continua' },
    { label: t('services.comparison.operational'), basic: 'No', premium: 'Sì, 1 categoria', gold: 'Sì, senza limiti' },
    { label: t('services.comparison.response_time'), basic: '—', premium: 'Entro 24h', gold: 'Entro 24h' },
    { label: t('services.comparison.handling'), basic: '—', premium: 'Entro 48h', gold: 'Entro 24h' },
    { label: t('services.comparison.account_access'), basic: 'No', premium: 'Sì, 1 categoria', gold: 'Sì, completo' },
  ];

  const faqs = [
    { question: t('services.faq.q1'), answer: t('services.faq.a1') },
    { question: t('services.faq.q2'), answer: t('services.faq.a2') },
    { question: t('services.faq.q3'), answer: t('services.faq.a3') },
    { question: t('services.faq.q4'), answer: t('services.faq.a4') },
    { question: t('services.faq.q5'), answer: t('services.faq.a5') },
    { question: t('services.faq.q6'), answer: t('services.faq.a6') },
    { question: t('services.faq.q7'), answer: t('services.faq.a7') },
    { question: t('services.faq.q8'), answer: t('services.faq.a8') },
    { question: t('services.faq.q9'), answer: t('services.faq.a9') },
    { question: t('services.faq.q10'), answer: t('services.faq.a10') },
    { question: t('services.faq.q11'), answer: t('services.faq.a11') },
    { question: t('services.faq.q12'), answer: t('services.faq.a12') },
  ];

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              {t('services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* PACCHETTI CON PREZZI E ATTIVAZIONE */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="space-y-16">
            
            {/* PACCHETTO BASIC */}
            <div id="basic" className="grid lg:grid-cols-2 gap-12 items-start scroll-mt-24">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">{t('services.packages.basic.label')}</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">{t('services.packages.basic.name')}</h2>
                <p className="text-white text-xl font-medium mb-4">{t('services.packages.basic.tagline')}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{t('services.packages.basic.price')}</span>
                  <span className="text-[#9a9a96] ml-2">{t('services.packages.basic.period')}</span>
                </div>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  {t('services.packages.basic.description')}
                </p>
                <Link to="/checkout/basic" className="btn-secondary">
                  {t('services.packages.basic.cta')}
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">{t('services.packages.basic.includes_title')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.basic.include1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.basic.include2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.basic.include3')}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-[#343633]">
                  <h4 className="text-[#6f716d] font-semibold mb-4">{t('services.packages.basic.excludes_title')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="text-[#6f716d] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#6f716d]">{t('services.packages.basic.exclude1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-[#6f716d] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#6f716d]">{t('services.packages.basic.exclude2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-[#343633]"></div>

            {/* PACCHETTO PREMIUM */}
            <div id="premium" className="grid lg:grid-cols-2 gap-12 items-start scroll-mt-24">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">{t('services.packages.premium.label')}</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">{t('services.packages.premium.name')}</h2>
                <p className="text-white text-xl font-medium mb-4">{t('services.packages.premium.tagline')}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{t('services.packages.premium.price')}</span>
                  <span className="text-[#9a9a96] ml-2">{t('services.packages.premium.period')}</span>
                </div>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  {t('services.packages.premium.description')}
                </p>
                <Link to="/checkout/premium" className="btn-primary">
                  {t('services.packages.premium.cta')}
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border-2 border-[#c8f000]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">{t('services.packages.premium.includes_title')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.premium.include1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.premium.include2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.premium.include3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.premium.include4')}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-[#343633]">
                  <h4 className="text-white font-semibold mb-4">{t('services.packages.premium.scope_title')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">{t('services.packages.premium.scope1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">{t('services.packages.premium.scope2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-[#343633]"></div>

            {/* PACCHETTO GOLD */}
            <div id="gold" className="grid lg:grid-cols-2 gap-12 items-start scroll-mt-24">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">{t('services.packages.gold.label')}</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">{t('services.packages.gold.name')}</h2>
                <p className="text-white text-xl font-medium mb-4">{t('services.packages.gold.tagline')}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{t('services.packages.gold.price')}</span>
                  <span className="text-[#9a9a96] ml-2">{t('services.packages.gold.period')}</span>
                  <span className="ml-4 inline-block bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full">{t('services.packages.gold.availability')}</span>
                </div>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  {t('services.packages.gold.description')}
                </p>
                <Link to="/checkout/gold" className="btn-secondary">
                  {t('services.packages.gold.cta')}
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">{t('services.packages.gold.includes_title')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.gold.include1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.gold.include2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.gold.include3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">{t('services.packages.gold.include4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPARAZIONE TECNICA */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-12 text-center">
            {t('services.comparison.title')}
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left text-[#9a9a96] font-medium"></th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border border-[#343633] border-b-0 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {t('services.comparison.badge_economic')}
                      </span>
                      <span className="text-[#c8f000] font-bold text-xl">Basic</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 200/mese</p>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border-2 border-[#c8f000] border-b-0 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {t('services.comparison.badge_popular')}
                      </span>
                      <span className="text-[#c8f000] font-bold text-xl">Premium</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 400/mese</p>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border border-[#343633] border-b-0 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase whitespace-nowrap">
                        {t('services.comparison.badge_complete')}
                      </span>
                      <span className="text-[#c8f000] font-bold text-xl">Gold</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 1'700/mese</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td className="p-4 text-[#9a9a96] font-medium text-sm">{row.label}</td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x border-[#343633] ${index === comparisonData.length - 1 ? 'border-b rounded-b-xl' : ''}`}>
                        <span className={`text-sm ${row.basic === 'No' || row.basic === '—' ? 'text-[#6f716d]' : 'text-white'}`}>{row.basic}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x-2 border-[#c8f000] ${index === comparisonData.length - 1 ? 'border-b-2 rounded-b-xl' : ''}`}>
                        <span className="text-white text-sm">{row.premium}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x border-[#343633] ${index === comparisonData.length - 1 ? 'border-b rounded-b-xl' : ''}`}>
                        <span className="text-white text-sm">{row.gold}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {[
              { name: 'Basic', price: 'CHF 200/mese', data: comparisonData.map(r => r.basic), highlighted: false, badge: t('services.comparison.badge_economic') },
              { name: 'Premium', price: 'CHF 400/mese', data: comparisonData.map(r => r.premium), highlighted: true, badge: t('services.comparison.badge_popular') },
              { name: 'Gold', price: 'CHF 1\'700/mese', data: comparisonData.map(r => r.gold), highlighted: false, badge: t('services.comparison.badge_complete') }
            ].map((pkg) => (
              <div 
                key={pkg.name} 
                className={`bg-[#2a2c29] rounded-xl p-6 border ${pkg.highlighted ? 'border-2 border-[#c8f000]' : 'border-[#343633]'} relative`}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase whitespace-nowrap">
                  {pkg.badge}
                </span>
                <h3 className="text-[#c8f000] font-bold text-xl mb-1 mt-2">{pkg.name}</h3>
                <p className="text-[#9a9a96] text-sm mb-4">{pkg.price}</p>
                <div className="space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="flex justify-between items-start gap-4">
                      <span className="text-[#6f716d] text-sm">{row.label}</span>
                      <span className={`text-sm text-right ${pkg.data[index] === 'No' || pkg.data[index] === '—' ? 'text-[#6f716d]' : 'text-white'}`}>
                        {pkg.data[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#2a2c29] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">
              {t('services.faq.title')}
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-[#161716] border border-[#343633] rounded-lg px-6 data-[state=open]:border-[#c8f000]"
                >
                  <AccordionTrigger className="text-white hover:text-[#c8f000] text-left py-5 text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9a9a96] pb-5 text-sm leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
            {t('services.cta_final.title')}
          </h2>
          <p className="text-[#9a9a96] text-lg mb-8">
            {t('services.cta_final.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/valutazione" className="btn-primary text-base px-8 py-4">
              {t('services.cta_final.cta_evaluation')}
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link to="/contatti" className="btn-secondary text-base px-8 py-4">
              {t('services.cta_final.cta_contact')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servizi;
