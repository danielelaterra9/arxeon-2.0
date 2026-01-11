import React, { useEffect } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';

const Contatti = () => {
  const { t } = useTranslation();
  const { trackViewContatti } = useAnalytics();

  // Track page view and scroll to top
  useEffect(() => {
    trackViewContatti();
    window.scrollTo(0, 0);
  }, [trackViewContatti]);

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* CONTATTI EMAIL */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-white font-bold text-2xl mb-8">{t('contact.email.title')}</h2>
            
            <a 
              href="mailto:info@arxeon.ch" 
              className="flex items-center justify-center gap-4 p-6 bg-[#2a2c29] rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors mb-8 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#343633] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8f000] transition-colors">
                <Mail className="text-[#c8f000] group-hover:text-[#161716] transition-colors" size={22} />
              </div>
              <div className="text-left">
                <p className="text-[#c8f000] font-semibold">info@arxeon.ch</p>
                <p className="text-[#6f716d] text-sm">{t('contact.email.response_time')}</p>
              </div>
            </a>

            <p className="text-[#9a9a96] text-sm leading-relaxed">
              {t('contact.no_pressure')}
            </p>
          </div>
        </div>
      </section>

      {/* RASSICURAZIONE UMANA + LINK CHIAMATA */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[700px] mx-auto px-5 md:px-10">
          <div className="bg-[#1f211f] p-8 rounded-xl border border-[#343633]">
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('contact.reassurance.title')}
            </h3>
            <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
              {t('contact.reassurance.description')}
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                {t('contact.reassurance.point1')}
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                {t('contact.reassurance.point2')}
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                {t('contact.reassurance.point3')}
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                {t('contact.reassurance.point4')}
              </li>
            </ul>
            
            {/* Sezione chiamata conoscitiva */}
            <div className="pt-6 border-t border-[#343633]">
              <h4 className="text-white font-semibold mb-4">{t('contact.call.title')}</h4>
              <p className="text-[#9a9a96] text-sm mb-4">
                {t('contact.call.intro')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3 text-[#9a9a96] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-1.5 flex-shrink-0"></span>
                  {t('contact.call.condition1')}
                </li>
                <li className="flex items-start gap-3 text-[#9a9a96] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-1.5 flex-shrink-0"></span>
                  {t('contact.call.condition2')}
                </li>
                <li className="flex items-start gap-3 text-[#9a9a96] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-1.5 flex-shrink-0"></span>
                  {t('contact.call.condition3')}
                </li>
                <li className="flex items-start gap-3 text-[#9a9a96] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-1.5 flex-shrink-0"></span>
                  {t('contact.call.condition4')}
                </li>
              </ul>
              <a 
                href="mailto:info@arxeon.ch?subject=Richiesta chiamata conoscitiva" 
                className="inline-flex items-center gap-2 text-[#c8f000] font-medium hover:underline"
              >
                {t('contact.call.cta')}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;
