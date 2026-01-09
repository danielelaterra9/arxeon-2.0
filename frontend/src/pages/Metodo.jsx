import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Metodo = () => {
  const [currentCase, setCurrentCase] = useState(0);

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
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight">
              Un metodo chiaro,<br />applicato a ogni progetto.
            </h1>
          </div>
        </div>
      </section>

      {/* IL PROBLEMA */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              Il marketing improvvisato crea confusione, sprechi e risultati poco leggibili.<br />
              <span className="text-white font-medium">Il metodo serve a togliere incertezza.</span>
            </p>
          </div>
        </div>
      </section>

      {/* IL METODO ARXÉON */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-16 text-center">Il Metodo Arxéon</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Diagramma 4 step */}
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting line desktop */}
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-[#343633]"></div>
              
              {[
                { num: '01', title: 'Analisi', desc: 'Capiamo cosa funziona e cosa no nel tuo marketing attuale.' },
                { num: '02', title: 'Strategia', desc: 'Definiamo obiettivi realistici e un piano d\'azione concreto.' },
                { num: '03', title: 'Attivazione', desc: 'Mettiamo in funzione i servizi giusti per i tuoi obiettivi.' },
                { num: '04', title: 'Ottimizzazione', desc: 'Miglioriamo continuamente sulla base dei dati raccolti.' },
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-6 text-[#161716] font-bold text-lg relative z-10">
                    {index + 1}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-[#9a9a96] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ESEMPI REALI - CASE STUDIES */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">
              Esempi reali di come applichiamo il metodo
            </h2>

            {/* Case Study Slider */}
            <div className="relative">
              {/* Case Study Card */}
              <div className="bg-[#161716] p-6 md:p-8 rounded-xl border border-[#343633]">
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

                  <div className="bg-[#2a2c29] p-4 rounded-lg border-l-2 border-[#c8f000]">
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
          
          {/* CTA dopo testimonianze */}
          <div className="text-center mt-12">
            <Link to="/servizi#basic" className="btn-primary">
              Scegli il pacchetto più adatto
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PERCHÉ FUNZIONA */}
      <section className="py-24 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">Perché funziona</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">Processo ripetibile</h3>
                <p className="text-[#9a9a96] text-sm">Ogni progetto segue lo stesso schema collaudato, riducendo errori e imprevisti.</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">Decisioni basate sui dati</h3>
                <p className="text-[#9a9a96] text-sm">Niente supposizioni: ogni scelta è supportata da metriche e risultati misurabili.</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">Riduzione del rischio</h3>
                <p className="text-[#9a9a96] text-sm">L'analisi iniziale previene investimenti sbagliati e ottimizza le risorse.</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-2">Chiarezza operativa</h3>
                <p className="text-[#9a9a96] text-sm">Sai sempre cosa stiamo facendo, perché e quali risultati stiamo ottenendo.</p>
              </div>
            </div>
            
            {/* CTA sotto Perché funziona */}
            <div className="text-center mt-12">
              <Link to="/servizi#basic" className="btn-primary">
                Scegli il pacchetto più adatto
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CON CHI LAVORIAMO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-8">Con chi lavoriamo</h2>
            <p className="text-[#9a9a96] text-lg leading-relaxed mb-4">
              Non lavoriamo con tutti.
            </p>
            <p className="text-white text-lg leading-relaxed mb-8">
              Lavoriamo quando il marketing può essere migliorato in modo concreto.
            </p>
            <Link to="/valutazione" className="text-[#c8f000] text-lg font-medium hover:underline inline-flex items-center gap-2 mb-8">
              Scoprilo ora, con la valutazione gratuita
              <ArrowRight size={18} />
            </Link>
            <div>
              <Link to="/valutazione" className="btn-primary">
                Richiedi una valutazione gratuita
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Metodo;
