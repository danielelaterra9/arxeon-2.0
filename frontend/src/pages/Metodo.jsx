import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';

const Metodo = () => {
  const { t } = useTranslation();
  const [currentCase, setCurrentCase] = useState(0);
  const { trackViewMetodo } = useAnalytics();

  useEffect(() => {
    trackViewMetodo();
  }, [trackViewMetodo]);

  const caseStudies = [
    {
      id: 1,
      title: 'Studio professionale – Servizi B2B',
      situation: 'Uno studio professionale con buona reputazione locale riceveva pochi contatti online. Il sito era datato, non c\'era presenza sui motori di ricerca e i social venivano aggiornati raramente.',
      intervention: 'Abbiamo rifatto il sito con focus sulla chiarezza dell\'offerta, ottimizzato la scheda Google My Business e attivato una campagna Google Ads mirata su ricerche locali specifiche.',
      result: 'Nel primo trimestre le richieste di contatto sono aumentate in modo stabile. Il costo per contatto si è rivelato sostenibile e il cliente ha potuto selezionare i progetti migliori.'
    },
    {
      id: 2,
      title: 'Attività locale – Ristorazione',
      situation: 'Un ristorante con buona affluenza nel weekend faticava a riempire i tavoli nei giorni infrasettimanali. Non aveva una strategia chiara per comunicare offerte o eventi.',
      intervention: 'Abbiamo impostato una gestione social costante, con contenuti mirati ai giorni deboli. Attivato un sistema di prenotazione semplificato e campagne Meta Ads geo-localizzate.',
      result: 'L\'affluenza nei giorni feriali è migliorata progressivamente. Il cliente ha potuto pianificare meglio il personale e ridurre gli sprechi in cucina.'
    },
    {
      id: 3,
      title: 'E-commerce – Prodotti di nicchia',
      situation: 'Un piccolo e-commerce con prodotti di qualità aveva traffico ma poche conversioni. Il funnel era confuso e mancava una strategia di remarketing.',
      intervention: 'Abbiamo semplificato il percorso d\'acquisto, migliorato le schede prodotto e attivato campagne di remarketing su chi aveva visitato il sito senza acquistare.',
      result: 'Il tasso di conversione è migliorato in modo misurabile. Il costo di acquisizione cliente si è ridotto, rendendo sostenibili anche campagne con budget contenuti.'
    },
    {
      id: 4,
      title: 'Startup – Servizi digitali',
      situation: 'Una startup con un buon prodotto non riusciva a comunicare chiaramente il proprio valore. Il posizionamento era confuso e le campagne pubblicitarie non portavano risultati.',
      intervention: 'Abbiamo lavorato sul posizionamento e sul messaggio, semplificando la proposta di valore. Rivisto il sito, creato landing page dedicate e testato diversi canali pubblicitari.',
      result: 'Il messaggio è diventato più chiaro e le campagne hanno iniziato a generare lead qualificati. Il team ha potuto concentrarsi sullo sviluppo invece che sulla ricerca clienti.'
    }
  ];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              {t('method.hero.title')}
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              {t('method.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPI */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-16 text-center">{t('method.principles.title')}</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#161716] font-bold text-xl">1</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{t('method.principles.principle1_title')}</h3>
                <p className="text-[#9a9a96] text-sm leading-relaxed">{t('method.principles.principle1_desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#161716] font-bold text-xl">2</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{t('method.principles.principle2_title')}</h3>
                <p className="text-[#9a9a96] text-sm leading-relaxed">{t('method.principles.principle2_desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#161716] font-bold text-xl">3</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{t('method.principles.principle3_title')}</h3>
                <p className="text-[#9a9a96] text-sm leading-relaxed">{t('method.principles.principle3_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESEMPI REALI - CASE STUDIES */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">
              {t('method.cases.title')}
            </h2>

            {/* Case Study Slider */}
            <div className="relative">
              {/* Case Study Card */}
              <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#c8f000] text-sm font-medium">
                    Caso {currentCase + 1} di {caseStudies.length}
                  </span>
                  <span className="text-[#6f716d] text-xs uppercase tracking-wider">
                    {caseStudies[currentCase].title.split('–')[1]?.trim() || 'Case Study'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl mb-6">
                  {caseStudies[currentCase].title}
                </h3>

                {/* Content Grid */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[#6f716d] text-xs uppercase tracking-wider mb-2">Situazione iniziale</h4>
                    <p className="text-[#9a9a96] text-sm leading-relaxed">
                      {caseStudies[currentCase].situation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[#6f716d] text-xs uppercase tracking-wider mb-2">Intervento Arxéon</h4>
                    <p className="text-[#9a9a96] text-sm leading-relaxed">
                      {caseStudies[currentCase].intervention}
                    </p>
                  </div>

                  <div className="bg-[#161716] p-4 rounded-lg border-l-2 border-[#c8f000]">
                    <h4 className="text-[#c8f000] text-xs uppercase tracking-wider mb-2">Risultato</h4>
                    <p className="text-white text-sm leading-relaxed">
                      {caseStudies[currentCase].result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {caseStudies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCase(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentCase ? 'bg-[#c8f000]' : 'bg-[#343633] hover:bg-[#6f716d]'
                      }`}
                      aria-label={`Vai al caso ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCase}
                    className="w-10 h-10 rounded-full bg-[#2a2c29] border border-[#343633] flex items-center justify-center text-[#9a9a96] hover:text-[#c8f000] hover:border-[#c8f000] transition-colors"
                    aria-label="Caso precedente"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextCase}
                    className="w-10 h-10 rounded-full bg-[#2a2c29] border border-[#343633] flex items-center justify-center text-[#9a9a96] hover:text-[#c8f000] hover:border-[#c8f000] transition-colors"
                    aria-label="Caso successivo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA dopo case studies */}
          <div className="text-center mt-12">
            <Link to="/servizi#basic" className="btn-primary">
              {t('method.cta_packages')}
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PERCHÉ FUNZIONA */}
      <section className="py-24 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">{t('method.whyItWorks.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">{t('method.whyItWorks.reason1_title')}</h3>
                <p className="text-[#9a9a96] text-sm">{t('method.whyItWorks.reason1_desc')}</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">{t('method.whyItWorks.reason2_title')}</h3>
                <p className="text-[#9a9a96] text-sm">{t('method.whyItWorks.reason2_desc')}</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">{t('method.whyItWorks.reason3_title')}</h3>
                <p className="text-[#9a9a96] text-sm">{t('method.whyItWorks.reason3_desc')}</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">Comunicazione diretta</h3>
                <p className="text-[#9a9a96] text-sm">Niente meeting inutili o report incomprensibili. Aggiornamento chiaro e puntuale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CON CHI LAVORIAMO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-8">{t('method.whoWeWork.title')}</h2>
            <p className="text-[#9a9a96] text-lg leading-relaxed mb-4">
              {t('method.whoWeWork.text1')}
            </p>
            <p className="text-white text-lg leading-relaxed mb-8">
              {t('method.whoWeWork.text2')}
            </p>
            <Link to="/valutazione" className="btn-primary">
              {t('method.whoWeWork.cta')}
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Metodo;
