import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Metodo = () => {
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
            <p className="text-white text-lg leading-relaxed mb-12">
              Lavoriamo quando il marketing può essere migliorato in modo concreto.
            </p>
            <Link to="/valutazione" className="btn-primary">
              Richiedi una valutazione gratuita
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Metodo;
