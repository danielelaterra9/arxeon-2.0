import React, { useEffect } from 'react';
import { Mail, ArrowRight, Calendar } from 'lucide-react';
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

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
      <section className="py-16 bg-[#1f211f]">
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

      {/* PRENOTA UNA CHIAMATA - CALENDLY */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#c8f000]" size={24} />
                <span className="text-[#c8f000] font-semibold">{t('contact.call.title')}</span>
              </div>
              <h2 className="text-white font-bold text-3xl md:text-4xl mb-6">{t('contact.reassurance.title')}</h2>
              <p className="text-[#9a9a96] text-lg mb-8">
                {t('contact.call.intro')}
              </p>
              <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">{t('contact.call.condition1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">{t('contact.call.condition2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">{t('contact.call.condition3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">{t('contact.call.condition4')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div 
                className="calendly-inline-widget rounded-xl overflow-hidden border border-[#343633]" 
                data-url="https://calendly.com/arxeon/30min?hide_gdpr_banner=1&background_color=161716&text_color=ffffff&primary_color=c8f000" 
                style={{ minWidth: '320px', height: '650px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RASSICURAZIONE */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[700px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
            <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
              {t('contact.reassurance.description')}
            </p>
            <ul className="space-y-2">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;
