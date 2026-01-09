import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ValutazioneConferma = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('valutazioneData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      navigate('/valutazione');
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!formData) {
    return null;
  }

  return (
    <main className="pt-20">
      {/* Success Section */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[#343633] flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="text-[#c8f000]" size={40} />
            </div>
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              {t('common.success')}
            </h1>
            <p className="text-[#9a9a96] text-lg mb-4">
              {formData.fullName.split(' ')[0]}, {t('evaluation.steps.step2_desc')}
            </p>
            <div className="flex items-center justify-center gap-2 text-[#9a9a96] mb-8">
              <Mail size={18} />
              <span><span className="text-[#c8f000]">{formData.email}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{t('home.howItWorks.step1_title')}</h3>
                <p className="text-[#9a9a96] text-sm">{t('evaluation.steps.step2_desc')}</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Report</h3>
                <p className="text-[#9a9a96] text-sm">{t('evaluation.steps.step3_desc')}</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Call</h3>
                <p className="text-[#9a9a96] text-sm">{t('contact.call.intro')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Call Section */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#c8f000]" size={24} />
                <span className="text-[#9a9a96] text-sm uppercase tracking-wider">{t('common.optional')}</span>
              </div>
              <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl mb-6">{t('contact.call.title')}</h2>
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

      {/* Back to Home */}
      <section className="py-16 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
          <p className="text-[#9a9a96] mb-6">
            {t('contact.no_pressure')}
          </p>
          <Link to="/" className="btn-secondary">
            {t('nav.home')}
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ValutazioneConferma;
