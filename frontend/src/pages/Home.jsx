import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';

const Home = () => {
  const { t } = useTranslation();
  const { trackViewHome } = useAnalytics();

  useEffect(() => {
    trackViewHome();
  }, [trackViewHome]);

  return (
    <main className="pt-20">
      {/* SEZIONE 1 – HERO */}
      <section className="min-h-[calc(100vh-80px)] flex items-center bg-[#161716] relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 w-full">
          <div className="max-w-4xl">
            <h1 className="text-[#c8f000] font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
              {t('home.hero.title1')}<br />
              {t('home.hero.title2')}
            </h1>
            <p className="text-[#9a9a96] text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/valutazione" className="btn-primary text-base px-8 py-4">
                {t('home.hero.cta_evaluation')}
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link 
                to="/servizi" 
                className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-base font-medium py-4 px-2 flex items-center gap-2"
              >
                {t('home.hero.cta_packages')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 2 – IDENTIFICAZIONE DEL PROBLEMA */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-8">
              {t('home.problem.title1')}<br />
              <span className="text-white">{t('home.problem.title2')}</span>
            </h2>
            <p className="text-[#9a9a96] text-lg mb-8">
              {t('home.problem.description')}
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">{t('home.problem.point1')}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">{t('home.problem.point2')}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">{t('home.problem.point3')}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">{t('home.problem.point4')}</span>
              </li>
            </ul>
            <p className="text-white text-xl font-medium">
              {t('home.problem.conclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE 3 – SOLUZIONE ARXÉON */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-8">
              {t('home.solution.title1')}<br />
              {t('home.solution.title2')}
            </h2>
            <div className="space-y-6">
              <p className="text-[#9a9a96] text-lg leading-relaxed">
                {t('home.solution.description1')}
              </p>
              <p className="text-white text-xl font-medium leading-relaxed">
                {t('home.solution.description2')}
              </p>
              <p className="text-[#9a9a96] text-lg leading-relaxed">
                {t('home.solution.principle')}
              </p>
              <p className="text-[#c8f000] text-xl font-semibold leading-relaxed mb-8">
                {t('home.solution.principle_highlight')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4 – METODO IN 3 STEP */}
      <section className="py-24 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-16 max-w-2xl">
            {t('home.howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { num: '01', title: t('home.howItWorks.step1_title'), desc: t('home.howItWorks.step1_desc') },
              { num: '02', title: t('home.howItWorks.step2_title'), desc: t('home.howItWorks.step2_desc') },
              { num: '03', title: t('home.howItWorks.step3_title'), desc: t('home.howItWorks.step3_desc') },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-black text-[#9a9a96] mb-4">{step.num}</div>
                <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-[#9a9a96]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE 4.5 – TESTIMONIAL + FOUNDER */}
      <section className="py-20 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Testimonials compatti */}
            <div>
              <h3 className="text-[#c8f000] font-bold text-xl mb-6">{t('home.testimonials.title')}</h3>
              <div className="space-y-4">
                <div className="bg-[#2a2c29] p-5 rounded-xl border border-[#343633]">
                  <p className="text-white text-sm italic mb-3">&ldquo;{t('home.testimonials.quote1')}&rdquo;</p>
                  <p className="text-[#6f716d] text-xs">— {t('home.testimonials.author1')}</p>
                </div>
                <div className="bg-[#2a2c29] p-5 rounded-xl border border-[#343633]">
                  <p className="text-white text-sm italic mb-3">&ldquo;{t('home.testimonials.quote2')}&rdquo;</p>
                  <p className="text-[#6f716d] text-xs">— {t('home.testimonials.author2')}</p>
                </div>
              </div>
              <Link to="/metodo" className="inline-flex items-center gap-2 text-[#c8f000] text-sm font-medium mt-4 hover:underline">
                {t('home.testimonials.read_more')}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Profilo Founder */}
            <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4D03AQGUdGYs25ZNEQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728918126053?e=1742428800&v=beta&t=oGXhfVzKWBzKMHv_k4cQvMw0oFlZmMkYZYWZyKqCTrI"
                    alt="Daniele La Terra"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#c8f000]"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-bold text-lg">{t('home.founder.name')}</h4>
                  <p className="text-[#c8f000] text-sm font-medium mb-3">{t('home.founder.role')}</p>
                  <p className="text-[#9a9a96] text-sm leading-relaxed mb-4">
                    {t('home.founder.bio')}
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/daniele-la-terra-7b1ba5238/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#c8f000] text-sm font-medium hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    {t('home.founder.linkedin_cta')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 5 – PREVIEW PACCHETTI */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-4">
              {t('home.packages.title1')}
            </h2>
            <p className="text-white text-2xl md:text-3xl font-bold mb-6">
              {t('home.packages.title2')}
            </p>
            <p className="text-[#9a9a96] text-lg max-w-2xl mx-auto">
              {t('home.packages.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link to="/servizi#basic" className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors cursor-pointer block">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">{t('home.packages.basic.name')}</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">{t('home.packages.basic.tagline')}</p>
              <p className="text-[#9a9a96]">{t('home.packages.basic.description')}</p>
            </Link>
            <Link to="/servizi#premium" className="bg-[#2a2c29] p-8 rounded-xl border border-[#c8f000] hover:border-[#c8f000] transition-colors cursor-pointer block">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">{t('home.packages.premium.name')}</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">{t('home.packages.premium.tagline')}</p>
              <p className="text-[#9a9a96]">{t('home.packages.premium.description')}</p>
            </Link>
            <Link to="/servizi#gold" className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors cursor-pointer block">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">{t('home.packages.gold.name')}</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">{t('home.packages.gold.tagline')}</p>
              <p className="text-[#9a9a96]">{t('home.packages.gold.description')}</p>
            </Link>
          </div>
          <div className="text-center">
            <Link to="/servizi" className="btn-secondary">
              {t('home.packages.compare_cta')}
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEZIONE 6 – CTA FINALE */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-8">
              {t('home.cta_final.title')}
            </h2>
            <p className="text-[#9a9a96] text-lg mb-10">
              {t('home.cta_final.subtitle')}
            </p>
            <Link to="/valutazione" className="btn-primary text-base px-10 py-4">
              {t('home.cta_final.button')}
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
