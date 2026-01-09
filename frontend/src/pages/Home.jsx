import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

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
